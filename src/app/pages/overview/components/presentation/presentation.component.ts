import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { filter, tap } from 'rxjs';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { ExamComponent } from '../../../../shared/business/exam/exam.component';
import { OverviewStore } from '../../store/overview.store';
import { GetExamCopyResponseDto } from '../../../../../clients/dz-dialect-training-api';

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
export class PresentationComponent {
  @Input() presentationExamCopy!: GetExamCopyResponseDto;

  constructor(
    private readonly overviewStore: OverviewStore,
    private readonly confirmDialogService: ConfirmDialogService,
  ) {}

  onExamComplete(): void {
    this.overviewStore.getExamResultsFromExamId(this.presentationExamCopy.examId);
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
