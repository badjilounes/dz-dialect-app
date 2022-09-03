import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.service';
import { TrainingPresentationStore } from '../../store/training-presentation.store';

@Component({
  selector: 'app-training-presentation-overview',
  templateUrl: './training-presentation-overview.component.html',
  styleUrls: ['./training-presentation-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LetModule, MatProgressSpinnerModule, MatButtonModule, TranslateModule],
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
