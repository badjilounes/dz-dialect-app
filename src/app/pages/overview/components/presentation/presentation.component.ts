import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { filter, tap } from 'rxjs';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { ExamComponent } from '../../../../shared/business/exam/exam.component';
import { OverviewStore } from '../../store/overview.store';
import { ThemeService } from '../../../../core/theme/theme.service';

@UntilDestroy()
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ExamComponent,
    ConfirmDialogModule,
  ],
})
export class PresentationComponent implements OnInit {
  @Input() presentationExamId!: string;

  constructor(
    private readonly overviewStore: OverviewStore,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly theme: ThemeService,
  ) {}

  ngOnInit(): void {
    this.theme.applyThemeToStatusBar();
  }

  onExamComplete(): void {
    this.overviewStore.getExamResultsFromExamId(this.presentationExamId);
  }

  onExamSkip(): void {
    this.confirmDialogService
      .confirm({
        data: {
          title: 'training.training-presentation.cancel-confirmation-dialog.title',
          content: '',
          cancelLabel: 'training.training-presentation.cancel-confirmation-dialog.cancel-button',
          acceptLabel: 'training.training-presentation.cancel-confirmation-dialog.confirm-button',
          acceptButtonColor: 'warn',
        },
      })
      .pipe(
        filter((confirmed) => confirmed),
        tap(() => this.overviewStore.skipPresentation()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
