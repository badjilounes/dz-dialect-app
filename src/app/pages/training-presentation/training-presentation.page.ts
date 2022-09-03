import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { filter, map, tap } from 'rxjs';
import { TranslationTrainingEndEvent } from 'src/app/shared/business/translation-training/models/translation-training-end-event';
import { TranslationTrainingStepChangeEvent } from 'src/app/shared/business/translation-training/models/translation-training-step-change-event';
import { TranslationTrainingComponent } from 'src/app/shared/business/translation-training/translation-training.component';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { StorageModule } from 'src/app/shared/technical/storage/storage.module';
import { TrainingPresentationOverviewComponent } from './components/training-presentation-overview/training-presentation-overview.component';
import { TrainingPresentationResultComponent } from './components/training-presentation-result/training-presentation-result.component';
import { TrainingDisplay } from './models/training-display';
import { TrainingResult } from './models/training-result';
import { TrainingPresentationStore } from './store/training-presentation.store';

@Component({
  selector: 'app-training-presentation',
  templateUrl: './training-presentation.page.html',
  styleUrls: ['./training-presentation.page.scss'],
  providers: [provideComponentStore(TrainingPresentationStore)],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TrainingPresentationResultComponent,
    TrainingPresentationOverviewComponent,
    TranslationTrainingComponent,
    ConfirmDialogModule,
    MatSnackBarModule,
    StorageModule,
    LetModule,
  ],
})
@UntilDestroy()
export class TrainingPresentationPage {
  showTrainingResult$ = this.trainingPresentationStore.display$.pipe(
    map((display) => display === TrainingDisplay.RESULT),
  );
  showTrainingHome$ = this.trainingPresentationStore.display$.pipe(
    map((display) => display === TrainingDisplay.HOME),
  );
  showTraining$ = this.trainingPresentationStore.display$.pipe(
    map((display) => display === TrainingDisplay.TRAINING),
  );

  sentences$ = this.trainingPresentationStore.sentences$;
  result$ = this.trainingPresentationStore.result$;

  constructor(
    private readonly trainingPresentationStore: TrainingPresentationStore,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly router: Router,
  ) {}

  onStepChange(event: TranslationTrainingStepChangeEvent): void {}

  onTrainingCancel(): void {
    this.confirmDialogService
      .confirm({
        data: {
          title: 'training.training-presentation.cancel-confirmation-dialog.title',
          content: 'training.training-presentation.cancel-confirmation-dialog.content',
          cancelLabel: 'training.training-presentation.cancel-confirmation-dialog.cancel-button',
          acceptLabel: 'training.training-presentation.cancel-confirmation-dialog.confirm-button',
        },
      })
      .pipe(
        filter((confirmed) => confirmed),
        tap(() => this.trainingPresentationStore.cancelTraining()),
        untilDestroyed(this),
      )
      .subscribe(() => this.router.navigate(['/train']));
  }

  onTrainingEnd(event: TranslationTrainingEndEvent): void {
    const result: TrainingResult = { note: event.result.note, total: event.result.history.length };
    this.trainingPresentationStore.showTrainingResults(result);
  }
}
