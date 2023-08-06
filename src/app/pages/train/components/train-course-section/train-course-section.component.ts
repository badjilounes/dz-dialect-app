import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { GetExerciseCourseResponseDto } from '../../../../../clients/dz-dialect-training-api';
import { CommonModule } from '@angular/common';
import {
  TrainButtonComponent,
  TrainButtonAppearance,
} from '../train-button/train-button.component';
import { ThemeService } from '../../../../core/theme/theme.service';
import { AppStore } from '../../../../app.store';
import { LetModule } from '@ngrx/component';
import { TrainCourseSectionButtonBuilderService } from './train-course-section-button-builder.service';
import { TrainButtonContextMenu } from '../train-button-context-menu/train-button-context-menu.component';
import { TrainButtonTooltip } from '../train-button-tooltip/train-button-tooltip.component';
import { TrainPageStore } from '../../train-page.store';
import { filter, fromEvent, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export type TrainCourseButton = {
  appearance: TrainButtonAppearance;
  background: string;
  offsetX: number;
  icon: string;
  contextMenu: TrainButtonContextMenu;
  tooltip?: TrainButtonTooltip;
  progress?: number;
};

@UntilDestroy()
@Component({
  selector: 'app-train-course-section',
  templateUrl: './train-course-section.component.html',
  styleUrls: ['./train-course-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LetModule, TrainButtonComponent],
  providers: [TrainCourseSectionButtonBuilderService],
})
export class TrainCourseSectionComponent implements OnInit {
  @Input() course!: GetExerciseCourseResponseDto;

  get headerBackgroundColor(): string | undefined {
    return this._theme.themeMode$.value === 'dark' ? 'rgb(32,47,54)' : this.course.color;
  }

  get hasButtonWithMenuOpened(): boolean {
    return (this.buttons ?? []).some((button) => button.menuOpened$.value);
  }

  buttonList: TrainCourseButton[] = [];

  isSmallScreen$ = this._appStore.isSmallScreen$;

  @ViewChildren(TrainButtonComponent) buttons!: TrainButtonComponent[];

  constructor(
    private readonly _appStore: AppStore,
    private readonly _buttonBuilder: TrainCourseSectionButtonBuilderService,
    private readonly _element: ElementRef<HTMLElement>,
    private readonly _theme: ThemeService,
    private readonly _trainPageStore: TrainPageStore,
  ) {}

  ngOnInit(): void {
    const color = this.course.color;
    this.buttonList = this.course.exams.map((e, i) => this._buttonBuilder.build(e, i, color));

    fromEvent(window, 'scroll')
      .pipe(
        filter(
          () =>
            (document.documentElement.scrollTop || document.body.scrollTop) >=
            this._element.nativeElement.offsetTop - 56,
        ),
        tap(() => this._trainPageStore.setToolbarColor(this.course.color)),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
