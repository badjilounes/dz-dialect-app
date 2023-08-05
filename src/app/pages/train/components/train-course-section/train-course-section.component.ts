import { ChangeDetectionStrategy, Component, Input, ViewChildren } from '@angular/core';
import { GetExerciseCourseResponseDto } from '../../../../../clients/dz-dialect-training-api';
import { CommonModule } from '@angular/common';
import { TrainButtonComponent } from '../train-button/train-button.component';
import { ThemeService } from '../../../../core/theme/theme.service';
import { AppStore } from '../../../../app.store';
import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-train-course-section',
  templateUrl: './train-course-section.component.html',
  styleUrls: ['./train-course-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LetModule, TrainButtonComponent],
})
export class TrainCourseSectionComponent {
  @Input() course!: GetExerciseCourseResponseDto;

  get headerBackgroundColor(): string {
    return this._theme.themeMode$.value === 'dark' ? 'rgb(32,47,54)' : this.course.color;
  }

  get hasButtonWithMenuOpened(): boolean {
    return (this.buttons ?? []).some((button) => button.menuOpened$.value);
  }

  isSmallScreen$ = this._appStore.isSmallScreen$;

  @ViewChildren(TrainButtonComponent) buttons!: TrainButtonComponent[];

  constructor(private readonly _appStore: AppStore, private readonly _theme: ThemeService) {}
}
