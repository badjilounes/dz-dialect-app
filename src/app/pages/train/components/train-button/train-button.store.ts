import { ComponentRef, ElementRef, Injectable, Injector, NgZone } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AppStore } from '../../../../app.store';
import { Observable, debounceTime, first, fromEvent, map, switchMap, tap } from 'rxjs';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  TRAIN_BUTTON_CONTEXT_MENU_DATA,
  TrainButtonContextMenu,
  TrainButtonContextMenuComponent,
} from '../train-button-context-menu/train-button-context-menu.component';
import { filterUndefined } from '../../../../shared/technical/operators/filter-undefined.operator';
import { CONTEXT_MENU_ANIMATION_DURATION } from '../train-button-context-menu/train-button-context-menu-animation';

type TrainButtonState = {
  element: ElementRef<HTMLElement>;

  contextMenu: {
    component: ComponentType<TrainButtonContextMenuComponent>;
    data: TrainButtonContextMenu;
    componentRef?: ComponentRef<TrainButtonContextMenuComponent>;
    scrollTopOffset?: number;
  };
};

@Injectable()
export class TrainButtonStore extends ComponentStore<TrainButtonState> {
  readonly contextMenuOpened$ = this.select((state) => state.contextMenu.componentRef).pipe(
    filterUndefined(),
    switchMap((componentRef) => componentRef.instance.menuOpened$),
  );

  constructor(
    private readonly _overlay: Overlay,
    private readonly _appStore: AppStore,
    private readonly _zone: NgZone,
  ) {
    super();
  }

  readonly openContextMenu = this.effect((source$: Observable<void>) => {
    return source$.pipe(
      map(() => this._getContextMenuMissingVerticalPixelToFitBelow()),

      tap((missingVerticalPixelToFitBelow) => {
        if (missingVerticalPixelToFitBelow) {
          this._openContextMenuWithScroll(missingVerticalPixelToFitBelow);
        } else {
          this._showContextMenu();
        }
      }),
    );
  });

  private readonly _openContextMenuWithScroll = this.effect((top$: Observable<number>) => {
    return top$.pipe(
      switchMap((top) => this._scrollBy({ top, behavior: 'smooth' })),
      tap(() => this._showContextMenu()),
    );
  });

  private _getContextMenuMissingVerticalPixelToFitBelow(): number {
    const { element } = this.get();

    const bottomBarHeight = this._appStore.isSmallScreen() ? 86 : 0;

    const overlayOffsetY = 16;
    const overlayHeight = this._getContextMenuHeight() + overlayOffsetY;

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

    return remainsEnoughHeightBelow && scrollOffset < 0
      ? Math.abs(scrollOffset) + overlayOffsetY
      : 0;
  }

  private _scrollBy(options: ScrollToOptions): Observable<boolean> {
    window.scrollBy(options);

    return fromEvent(window, 'scroll').pipe(
      debounceTime(50),
      first(),
      map(() => true),
    );
  }

  private _showContextMenu(): void {
    const { element } = this.get();

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 12,
          panelClass: 'context-menu--bottom',
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -12,
          panelClass: 'context-menu--top',
        },
      ])
      .withGrowAfterOpen(true)
      .withTransformOriginOn('.context-menu');

    const { componentRef, overlayRef } = this._attachContextMenu(positionStrategy);

    overlayRef
      .backdropClick()
      .pipe(
        tap(() => {
          componentRef.instance.close();

          this._zone.runOutsideAngular(() =>
            setTimeout(() => overlayRef.dispose(), CONTEXT_MENU_ANIMATION_DURATION),
          );
        }),
      )
      .subscribe();

    this.patchState((state) => ({
      contextMenu: { ...state.contextMenu, componentRef },
    }));
  }

  private _attachContextMenu(positionStrategy: PositionStrategy): {
    componentRef: ComponentRef<TrainButtonContextMenuComponent>;
    overlayRef: OverlayRef;
  } {
    const { contextMenu } = this.get();

    const overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: this._appStore.isSmallScreen()
        ? ['context-menu-pane', 'small-screen']
        : ['context-menu-pane'],
    });

    const componentPortal = new ComponentPortal(
      contextMenu.component,
      undefined,
      Injector.create({
        providers: [
          {
            provide: TRAIN_BUTTON_CONTEXT_MENU_DATA,
            useValue: contextMenu.data,
          },
        ],
      }),
    );

    const componentRef = overlayRef?.attach(componentPortal);
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.open();

    return { componentRef, overlayRef };
  }

  private _getContextMenuHeight(): number {
    const hiddenPositionstrategy = this._overlay.position().global().top('-9999px').left('-9999px');
    const { componentRef, overlayRef } = this._attachContextMenu(hiddenPositionstrategy);
    const height = componentRef.instance.element.nativeElement.getBoundingClientRect().height;
    overlayRef.dispose();
    return height;
  }
}
