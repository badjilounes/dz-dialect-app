import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable, shareReplay } from 'rxjs';
import { TrainingPresentationStore } from '../../store/training-presentation.store';

@Component({
  selector: 'app-training-presentation-result',
  templateUrl: './training-presentation-result.component.html',
  styleUrls: ['./training-presentation-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class TrainingPresentationResultComponent {
  @Input() score = 0;
  @Input() total = 0;
  loading$: Observable<boolean> = this.trainingStore.isLoading$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TrainingPresentationStore,
  ) {}

  restartTraining(): void {
    this.trainingStore.startTraining();
  }
}
