import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { provideComponentStore } from '@ngrx/component-store';
import { map, Observable, shareReplay } from 'rxjs';
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}
}
