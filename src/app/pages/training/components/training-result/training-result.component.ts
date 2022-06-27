import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';

@Component({
  selector: 'app-training-result',
  templateUrl: './training-result.component.html',
  styleUrls: ['./training-result.component.scss'],
})
@UntilDestroy()
export class TrainingResultComponent {
  score$: Observable<number> = this.trainingStore.note$;
  nbSteps$: Observable<number> = this.trainingStore.stepsCount$;
  loading$: Observable<boolean> = this.trainingStore.isLoading$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}

  restartTraining(): void {
    this.trainingStore.startTraining();
  }
}
