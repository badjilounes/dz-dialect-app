import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { filter, tap } from 'rxjs';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { GetExamResponseDto } from 'src/clients/dz-dialect-training-api';
import { ExamComponent } from '../../../../shared/business/exam/exam.component';
import { OverviewStore } from '../../store/overview.store';

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
  @Input() presentation!: GetExamResponseDto;

  constructor(
    private readonly overviewStore: OverviewStore,
    private readonly confirmDialogService: ConfirmDialogService,
  ) {}

  onExamComplete(): void {
    this.overviewStore.getResults(this.presentation.id);
  }

  onExamSkip(): void {
    this.confirmDialogService
      .confirm({
        data: {
          title: 'training.training-presentation.cancel-confirmation-dialog.title',
          content: '',
          cancelLabel: 'training.training-presentation.cancel-confirmation-dialog.cancel-button',
          acceptLabel: 'training.training-presentation.cancel-confirmation-dialog.confirm-button',
        },
      })
      .pipe(
        filter((confirmed) => confirmed),
        tap(() => this.overviewStore.skipPresentation(this.presentation.id)),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
