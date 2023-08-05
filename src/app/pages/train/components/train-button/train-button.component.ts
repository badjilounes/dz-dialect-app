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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TemplateRefModule } from '../../../../shared/technical/template-ref/template-ref.module';
import { ContextMenuDirective } from '../../directives/context-menu/context-menu.directive';
import { TrainButtonStore } from './train-button.store';
import { TrainButtonDataService } from '../../services/train-button-data/train-button-data.service';
import { ContextMenuAnimation } from './train-button-context-menu-animation';
import { SvgIconModule } from '../../../../shared/technical/svg-icon/svg-icon.module';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type ContextMenuData = {
  title: string;
  description: string;
  disabled: boolean;
  buttonLabel: string;
  backgroundColor?: string;
  buttonColor?: string;
};

export type ButtonData = {
  icon: string;
  offsetX: number;
  progress?: number;
  floatingLabel?: string;
  floatingLabelColor: string;
  backgroundColor?: string;
  boxShadow?: string;
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
  animations: ContextMenuAnimation,
  imports: [
    CommonModule,
    RouterModule,
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
    SvgIconModule,
  ],
  providers: [TrainButtonDataService, TrainButtonStore],
  exportAs: 'trainButton',
})
export class TrainButtonComponent implements OnInit {
  @Input() exam!: GetExerciseExamResponseDto;
  @Input() index!: number;
  @Input() color = '';
  @Input() showCurrentTooltip = false;

  data!: TrainButtonData;
  menuOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @ViewChild(ContextMenuDirective, { static: true }) contextMenu!: ContextMenuDirective;

  constructor(
    private readonly _element: ElementRef<HTMLElement>,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _trainButtonDataService: TrainButtonDataService,
    private readonly _store: TrainButtonStore,
  ) {}

  ngOnInit(): void {
    this.data = this._trainButtonDataService.buildData(this.exam, this.index, this.color);

    this._store.setState({
      data: this.data,
      viewContainerRef: this._viewContainerRef,
      element: this._element,
      contextMenu: {
        template: this.contextMenu.template,
        opened: false,
      },
    });

    this._store.contextMenuOpened$.pipe(untilDestroyed(this)).subscribe(this.menuOpened$);
  }

  openMenu(): void {
    this._store.openContextMenu();
  }
}