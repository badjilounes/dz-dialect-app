import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingStore } from '../../store/training.store';

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.page.html',
  styleUrls: ['./training-home.page.scss'],
})
@UntilDestroy()
export class TrainingHomeComponent {
  loading$ = this.trainingStore.isLoading$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingStore,
  ) {}

  startTraining(): void {
    this.trainingStore.startTraining();
  }
}
