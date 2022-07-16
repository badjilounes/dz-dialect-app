import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslationTrainingStore } from '../../store/translation-training.store';

@Component({
  selector: 'app-translation-training-progress',
  templateUrl: './translation-training-progress.component.html',
  styleUrls: ['./translation-training-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationTrainingProgressComponent {
  @Input() cancelOption = false;
  @Input() cancelOptionTooltip = '';

  progress$: Observable<number> = this.trainingStore.progress$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingStore: TranslationTrainingStore,
  ) {}

  cancel(): void {
    this.trainingStore.cancelTraining();
  }
}
