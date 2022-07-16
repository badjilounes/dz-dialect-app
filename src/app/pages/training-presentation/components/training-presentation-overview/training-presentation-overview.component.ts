import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { TrainingPresentationStore } from '../../store/training-presentation.store';

@Component({
  selector: 'app-training-presentation-overview',
  templateUrl: './training-presentation-overview.component.html',
  styleUrls: ['./training-presentation-overview.component.scss'],
})
@UntilDestroy()
export class TrainingPresentationOverviewComponent {
  loading$ = this.trainingPresentationStore.isLoading$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly trainingPresentationStore: TrainingPresentationStore,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly router: Router,
  ) {}

  startTraining(): void {
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
