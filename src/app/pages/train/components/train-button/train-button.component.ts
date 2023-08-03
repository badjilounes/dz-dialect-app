import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { LetModule } from '@ngrx/component';
import { IsButtonPressedDirective } from '../../../../shared/technical/behavior/add-class-on-click.directive';
import { StopClickPropagationDirective } from '../../../../shared/technical/behavior/stop-click-propagation.directive';
import { GetExerciseExamResponseDto } from '../../../../../clients/dz-dialect-training-api';
import { MatLegacyMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { UntilDestroy } from '@ngneat/until-destroy';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { TemplateRefModule } from '../../../../shared/technical/template-ref/template-ref.module';
import { ContextMenuDirective } from '../../directives/context-menu/context-menu.directive';
import { TrainButtonStore } from './train-button.store';
import { TrainingButtonDataService } from '../../services/training-button-data/training-button-data.service';

const MenuContextAnimation = [
  trigger('openClose', [
    state('closed', style({ transform: 'scale(0)' })),
    state('open', style({ transform: 'scale(1)' })),
    transition('open => closed', [animate('0.2s')]),
    transition('closed => open', [animate('0.2s')]),
  ]),
];

export type ContextMenuData = {
  title: string;
  description: string;
  disabled: boolean;
  buttonLabel: string;
};

export type ButtonData = {
  icon: string;
  offsetX: number;
  progress?: number;
  floatingLabel?: string;
};

export type TrainButtonData = {
  isCurrentExam: boolean;
  button: ButtonData;
  contextMenu: ContextMenuData;
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
    TemplateRefModule,
    ContextMenuDirective,
  ],
  providers: [TrainingButtonDataService, TrainButtonStore],
})
export class TrainButtonComponent implements OnInit {
  @Input() exam!: GetExerciseExamResponseDto;
  @Input() index!: number;

  data!: TrainButtonData;
  menuOpened$ = this._store.contextMenuOpened$;

  @ViewChild(ContextMenuDirective, { static: true }) contextMenu!: ContextMenuDirective;

  constructor(
    private readonly _element: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _trainButtonDataService: TrainingButtonDataService,
    private readonly _store: TrainButtonStore,
  ) {}

  ngOnInit(): void {
    this.data = this._trainButtonDataService.buildData(this.exam, this.index);

    this._store.setState({
      data: this.data,
      viewContainerRef: this._viewContainerRef,
      element: this._element,
      contextMenu: {
        template: this.contextMenu.template,
        opened: false,
      },
    });
  }

  openMenu(): void {
    this._store.openContextMenu();
  }
}
