import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingResult } from '../../models/training-result';
import { TrainingPresentationStore } from '../../store/training-presentation.store';

@Component({
  selector: 'app-training-presentation-result',
  templateUrl: './training-presentation-result.component.html',
  styleUrls: ['./training-presentation-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class TrainingPresentationResultComponent {
  @Input() result: TrainingResult = { note: 0, total: 0 };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  loading$: Observable<boolean> = this.trainingStore.isLoading$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingPresentationStore,
  ) {}

  restartTraining(): void {
    this.trainingStore.startTraining();
  }
}
