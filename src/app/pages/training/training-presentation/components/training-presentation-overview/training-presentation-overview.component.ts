import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingPresentationStore } from '../../store/training-presentation.store';

@Component({
  selector: 'app-training-presentation-overview',
  templateUrl: './training-presentation-overview.component.html',
  styleUrls: ['./training-presentation-overview.component.scss'],
})
@UntilDestroy()
export class TrainingPresentationOverviewComponent {
  loading$ = this.trainingStore.isLoading$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingPresentationStore,
  ) {}

  startTraining(): void {
    this.trainingStore.startTraining();
  }
}
