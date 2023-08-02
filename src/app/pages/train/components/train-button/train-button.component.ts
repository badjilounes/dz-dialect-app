import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LetModule } from '@ngrx/component';
import { IsButtonPressedDirective } from '../../../../shared/technical/behavior/add-class-on-click.directive';
import { StopClickPropagationDirective } from '../../../../shared/technical/behavior/stop-click-propagation.directive';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import {
  MAT_LEGACY_MENU_SCROLL_STRATEGY,
  MatLegacyMenuModule,
} from '@angular/material/legacy-menu';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { CommonModule } from '@angular/common';
import { CloseScrollStrategy, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, tap } from 'rxjs';
import { state, style, transition, animate, trigger } from '@angular/animations';

const MenuContextAnimation = [
  trigger('openClose', [
    state('closed', style({ transform: 'scale(0)' })),
    state('open', style({ transform: 'scale(1)' })),
    transition('open => closed', [animate('1s')]),
    transition('closed => open', [animate('0.2s')]),
  ]),
];

type ContextMenu = {
  title: string;
  description: string;
  disabled: boolean;
  buttonLabel: string;
};

type ButtonDisplay = {
  icon: string;
  progress?: number;
  floatingLabel?: string;
};

@UntilDestroy()
@Component({
  selector: 'app-train-button',
  templateUrl: './train-button.component.html',
  styleUrls: ['./train-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: MenuContextAnimation,
  imports: [
    CommonModule,
    LetModule,
    IsButtonPressedDirective,
    MatLegacyProgressSpinnerModule,
    MatLegacyMenuModule,
    MatLegacyButtonModule,
    OverlayModule,
    MatIconModule,
    StopClickPropagationDirective,
  ],
  providers: [
    {
      provide: MAT_LEGACY_MENU_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay): (() => CloseScrollStrategy) => {
        return () => overlay.scrollStrategies.close();
      },
      deps: [Overlay],
    },
  ],
})
export class TrainButtonComponent {
  @Input() exam!: GetExerciseExamResponseDto;

  get isCurrentExam(): boolean {
    return !!this.exam.current;
  }

  get buttonDisplay(): ButtonDisplay {
    return {
      icon: this.isCurrentExam ? 'home' : 'cadena',
      progress:
        this.exam.current &&
        (this.exam.current.questionIndex * 100) / this.exam.current.questionLength,
      floatingLabel:
        this.exam.current && this.exam.current.questionIndex ? 'reprendre' : 'commencer',
    };
  }

  get contextMenu(): ContextMenu {
    return {
      title: this.exam.name,
      description: this.exam.description,
      disabled: !this.isCurrentExam,
      buttonLabel: this.isCurrentExam ? 'commencer' : 'pas encore débloqué',
    };
  }

  menuOpened$ = new BehaviorSubject<boolean>(false);

  @ViewChild('menuTemplate') contextMenuTemplate!: TemplateRef<unknown>;

  private _overlayRef?: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _element: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef,
  ) {}

  openMenu(): void {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._element)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
      ])
      .withGrowAfterOpen(true)
      .withTransformOriginOn('.context-menu')
      .withPush(true);

    this._overlayRef = this._overlay.create({
      positionStrategy: positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      width: 295,
    });

    this._overlayRef
      .backdropClick()
      .pipe(
        tap(() => {
          this._overlayRef?.dispose();
          this.menuOpened$.next(false);
        }),
        untilDestroyed(this),
      )
      .subscribe();

    this._overlayRef.attach(new TemplatePortal(this.contextMenuTemplate, this._viewContainerRef));

    this.menuOpened$.next(true);
  }
}
