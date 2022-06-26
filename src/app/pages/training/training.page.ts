import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from './store/training.store';

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
  providers: [TrainingStore],
})
export class TrainingPage {
  showTrainingResult$ = this.trainingStore.showResult$;
  showTrainingHome$ = this.trainingStore.showHome$;
  showTraining$ = this.trainingStore.showTraining$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}
}
