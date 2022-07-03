import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';
import { TrainingDisplay } from './models/training-display';
import { TrainingStore } from './store/training.store';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
  providers: [provideComponentStore(TrainingStore)],
})
@UntilDestroy()
export class TrainingPage {
  showTrainingResult$ = this.trainingStore.display$.pipe(
    map((display) => display === TrainingDisplay.RESULT),
  );
  showTrainingHome$ = this.trainingStore.display$.pipe(
    map((display) => display === TrainingDisplay.HOME),
  );
  showTraining$ = this.trainingStore.display$.pipe(
    map((display) => display === TrainingDisplay.TRAINING),
  );

  constructor(private readonly trainingStore: TrainingStore) {}
}
