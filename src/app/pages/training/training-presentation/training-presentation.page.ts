import { Component } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';
import { TranslationTrainingResult } from 'src/app/shared/business/translation-training/models/translation-training-result';
import { TrainingDisplay } from './models/training-display';
import { TrainingPresentationStore } from './store/training-presentation.store';

@Component({
  selector: 'app-training-presentation',
  templateUrl: './training-presentation.page.html',
  styleUrls: ['./training-presentation.page.scss'],
  providers: [provideComponentStore(TrainingPresentationStore)],
})
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
  note = 0;
  total = 0;

  constructor(private readonly trainingPresentationStore: TrainingPresentationStore) {}

  showTrainingResults(result: TranslationTrainingResult): void {
    this.note = result.note;
    this.total = result.history.length;
    this.trainingPresentationStore.showTrainingResults();
  }
}
