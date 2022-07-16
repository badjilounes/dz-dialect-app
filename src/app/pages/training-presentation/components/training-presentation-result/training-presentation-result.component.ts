import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
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

  loading$: Observable<boolean> = this.trainingPresentationStore.isLoading$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingPresentationStore: TrainingPresentationStore,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly router: Router,
  ) {}

  restartTraining(): void {
    this.trainingPresentationStore.startTraining();
  }

  skipTraining(): void {
    this.confirmDialogService
      .confirm({
        data: {
          title: 'training.training-presentation.cancel-confirmation-dialog.title',
          content: '',
          cancelLabel: 'training.training-presentation.cancel-confirmation-dialog.cancel-button',
          acceptLabel: 'training.training-presentation.cancel-confirmation-dialog.confirm-button',
        },
      })
      .pipe(
        filter((confirmed) => confirmed),
        tap(() => this.trainingPresentationStore.cancelTraining()),
        untilDestroyed(this),
      )
      .subscribe(() => this.router.navigate(['/train']));
  }
}
