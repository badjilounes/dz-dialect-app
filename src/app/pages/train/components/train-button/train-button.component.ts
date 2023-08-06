import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LetModule } from '@ngrx/component';
import { IsButtonPressedDirective } from '../../../../shared/technical/behavior/add-class-on-click.directive';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TrainButtonStore } from './train-button.store';
import { ContextMenuAnimation } from '../train-button-context-menu/train-button-context-menu-animation';
import { SvgIconModule } from '../../../../shared/technical/svg-icon/svg-icon.module';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  TrainButtonContextMenu,
  TrainButtonContextMenuComponent,
} from '../train-button-context-menu/train-button-context-menu.component';
import {
  TrainButtonTooltip,
  TrainButtonTooltipComponent,
} from '../train-button-tooltip/train-button-tooltip.component';

// export type TrainButtonAppearance = {
//   icon: string;
//   background: string;
//   color: string;
//   shadow: string;
// };

export type TrainButtonAppearance = 'locked' | 'current' | 'success' | 'failure';

export type TrainButton = {
  appearance: TrainButtonAppearance;
  background: string;
  offsetX: number;
  icon: string;
};

@UntilDestroy()
@Component({
  selector: 'app-train-button',
  templateUrl: './train-button.component.html',
  styleUrls: ['./train-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: ContextMenuAnimation,
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule,
    LetModule,
    MatLegacyProgressSpinnerModule,
    MatLegacyButtonModule,
    MatIconModule,
    SvgIconModule,
    IsButtonPressedDirective,
    TrainButtonContextMenuComponent,
    TrainButtonTooltipComponent,
  ],
  providers: [TrainButtonStore],
  exportAs: 'trainButton',
})
export class TrainButtonComponent implements OnInit {
  @Input() appearance!: TrainButtonAppearance;
  @Input() background!: string;
  @Input() offsetX!: number;
  @Input() icon!: string;

  @Input() contextMenu!: TrainButtonContextMenu;
  @Input() tooltip?: TrainButtonTooltip;
  @Input() progress?: number;

  menuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _element: ElementRef<HTMLElement>,
    private readonly _store: TrainButtonStore,
  ) {}

  ngOnInit(): void {
    this._store.setState({
      element: this._element,
      contextMenu: {
        component: TrainButtonContextMenuComponent,
        data: this.contextMenu,
      },
    });

    this._store.contextMenuOpened$.pipe(untilDestroyed(this)).subscribe(this.menuOpened$);
  }

  openMenu(): void {
    this._store.openContextMenu();
  }
}
