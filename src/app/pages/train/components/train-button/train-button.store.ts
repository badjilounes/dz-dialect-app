import { ElementRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TrainButtonConfiguration } from './train-button.component';
import { TrainingButtonConfigurationService } from '../../services/training-button-configuration/training-button-configuration.service';
import { AppStore } from '../../../../app.store';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import { Observable, debounceTime, first, fromEvent, map, switchMap, tap } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { TemplateRefService } from '../../../../shared/technical/template-ref/template-ref.service';
import { TemplatePortal } from '@angular/cdk/portal';

type TrainButtonState = {
  exam: GetExerciseExamResponseDto;
  index: number;
  viewContainerRef: ViewContainerRef;
  element: ElementRef<HTMLElement>;
  contextMenu: TemplateRef<HTMLElement>;
  contextMenuOpened: boolean;
};

@Injectable()
export class TrainButtonStore extends ComponentStore<TrainButtonState> {
  get configuration(): TrainButtonConfiguration {
    return this._trainButtonConfigurationService.buildConfiguration(
      this.get().exam,
      this.get().index,
    );
  }

  readonly contextMenuOpened$ = this.select((state) => state.contextMenuOpened);

  constructor(
    private readonly _overlay: Overlay,
    private readonly _appStore: AppStore,
    private readonly _trainButtonConfigurationService: TrainingButtonConfigurationService,
    private readonly _templateRefService: TemplateRefService,
  ) {
    super();
  }

  readonly openContextMenu = this.effect((source$: Observable<void>) => {
    return source$.pipe(
      map(() => this._getOverlayOutsideViewPixel()),

      tap((overflow) => {
        if (overflow > 0) {
          this._openContextMenuWithScroll(overflow);
        } else {
          this._showContextMenu();
        }
      }),
    );
  });

  private readonly _openContextMenuWithScroll = this.effect((overflow$: Observable<number>) => {
    return overflow$.pipe(
      switchMap((overflow) => this._scrollBy({ top: overflow, behavior: 'smooth' })),
      tap(() => this._showContextMenu()),
    );
  });

  private _getOverlayOutsideViewPixel(): number {
    const { element, viewContainerRef, contextMenu } = this.get();
    const remaining = this._appStore.isSmallScreen()
      ? window.innerHeight - element.nativeElement.getBoundingClientRect().bottom - 86
      : window.innerHeight - element.nativeElement.getBoundingClientRect().bottom;

    const height = this._templateRefService.getHeight(viewContainerRef, contextMenu);

    return Math.ceil(height + 50 - remaining);
  }

  private _scrollBy(options: ScrollToOptions): Observable<boolean> {
    window.scrollBy(options);

    return fromEvent(window, 'scroll').pipe(
      debounceTime(100),
      first(),
      map(() => true),
    );
  }

  private _showContextMenu(): void {
    const { element, viewContainerRef, contextMenu } = this.get();

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 14,
        },
      ])
      .withGrowAfterOpen(true)
      .withTransformOriginOn('.context-menu');

    const overlayRef = this._overlay.create({
      positionStrategy: positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: 295,
    });

    overlayRef
      .backdropClick()
      .pipe(
        tap(() => {
          overlayRef.dispose();
          this.patchState({ contextMenuOpened: false });
        }),
      )
      .subscribe();

    overlayRef?.attach(new TemplatePortal(contextMenu, viewContainerRef));
    this.patchState({ contextMenuOpened: true });
  }
}
