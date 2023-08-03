import { ElementRef, Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TrainButtonData } from './train-button.component';
import { AppStore } from '../../../../app.store';
import { Observable, debounceTime, first, fromEvent, map, switchMap, tap } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { TemplateRefService } from '../../../../shared/technical/template-ref/template-ref.service';
import { TemplatePortal } from '@angular/cdk/portal';

type TrainButtonState = {
  data: TrainButtonData;
  element: ElementRef<HTMLElement>;
  viewContainerRef: ViewContainerRef;
  contextMenu: {
    template: TemplateRef<TrainButtonData>;
    opened: boolean;
    scrollTopOffset?: number;
    minHeight?: number;
  };
};

@Injectable()
export class TrainButtonStore extends ComponentStore<TrainButtonState> {
  readonly contextMenuOpened$ = this.select((state) => state.contextMenu.opened);

  constructor(
    private readonly _overlay: Overlay,
    private readonly _appStore: AppStore,
    private readonly _templateRefService: TemplateRefService,
  ) {
    super();
  }

  readonly openContextMenu = this.effect((source$: Observable<void>) => {
    return source$.pipe(
      map(() => this._setContextMenuOverlayConfiguration()),

      tap(() => {
        if (this.get().contextMenu.scrollTopOffset) {
          this._openContextMenuWithScroll();
        } else {
          this._showContextMenu();
        }
      }),
    );
  });

  private readonly _openContextMenuWithScroll = this.effect((overflow$: Observable<void>) => {
    return overflow$.pipe(
      switchMap(() =>
        this._scrollBy({ top: this.get().contextMenu.scrollTopOffset, behavior: 'smooth' }),
      ),
      tap(() => this._showContextMenu()),
    );
  });

  private _setContextMenuOverlayConfiguration(): void {
    const { element, viewContainerRef, contextMenu, data } = this.get();

    const bottomBarHeight = this._appStore.isSmallScreen() ? 86 : 0;
    const margins = 16;
    const overlayHeight =
      this._templateRefService.getHeight(viewContainerRef, contextMenu.template, data) + margins;

    const remaining =
      window.innerHeight - element.nativeElement.getBoundingClientRect().bottom - bottomBarHeight;
    const scrollOffset = Math.ceil(remaining - overlayHeight);

    const remainsEnoughHeightBelow =
      window.document.body.scrollHeight -
        element.nativeElement.offsetTop -
        element.nativeElement.offsetHeight -
        overlayHeight -
        bottomBarHeight >
      0;

    const scrollTopOffset =
      remainsEnoughHeightBelow && scrollOffset < 0 ? Math.abs(scrollOffset) + margins : 0;
    const minHeight = overlayHeight + bottomBarHeight;

    this.patchState((state) => ({
      contextMenu: {
        ...state.contextMenu,
        scrollTopOffset,
        minHeight,
      },
    }));
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
    const { element, viewContainerRef, contextMenu, data } = this.get();

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
          panelClass: 'context-menu--bottom',
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -14,
          panelClass: 'context-menu--top',
        },
      ])
      .withGrowAfterOpen(true)
      .withTransformOriginOn('.context-menu');

    const overlayRef = this._overlay.create({
      positionStrategy: positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: this._appStore.isSmallScreen()
        ? ['context-menu-pane', 'small-screen']
        : ['context-menu-pane'],
      minHeight: this.get().contextMenu.minHeight,
    });

    overlayRef
      .backdropClick()
      .pipe(
        tap(() => {
          overlayRef.dispose();
          this.patchState((state) => ({ contextMenu: { ...state.contextMenu, opened: false } }));
        }),
      )
      .subscribe();

    overlayRef?.attach(new TemplatePortal(contextMenu.template, viewContainerRef, data));

    this.patchState((state) => ({ contextMenu: { ...state.contextMenu, opened: true } }));
  }
}
