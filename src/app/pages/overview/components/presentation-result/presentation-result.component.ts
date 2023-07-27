import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { filter, map, Observable, shareReplay } from 'rxjs';
import { ConfirmDialogModule } from 'src/app/shared/technical/confirm-dialog/confirm-dialog.module';
import { ConfirmDialogService } from '../../../../shared/technical/confirm-dialog/confirm-dialog.service';
import { OverviewStore } from '../../store/overview.store';
import { StatusBarColor, ThemeService } from '../../../../core/theme/theme.service';

type TrainingResult = {
  note: number;
  total: number;
};

@UntilDestroy()
@Component({
  selector: 'app-presentation-result',
  templateUrl: './presentation-result.component.html',
  styleUrls: ['./presentation-result.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LetModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    TranslateModule,
    ConfirmDialogModule,
  ],
})
export class PresentationResultComponent implements OnInit, OnDestroy {
  @Input() result: TrainingResult = { note: 0, total: 0 };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  loading$: Observable<boolean> = this.overviewStore.isLoading$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly overviewStore: OverviewStore,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly router: Router,
    private readonly theme: ThemeService,
  ) {}

  ngOnInit(): void {
    if (this.theme.themeMode$.value === 'light') {
      this.theme.updateStatusBarColor(StatusBarColor.LIGHTGREEN);
    } else {
      this.theme.updateStatusBarColor(StatusBarColor.DARK);
    }
  }

  ngOnDestroy(): void {
    this.theme.setStatusBarColor();
  }

  restartTraining(): void {
    this.overviewStore.startPresentation();
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
        // tap(() => this.overviewStore.cancelTraining()),
        untilDestroyed(this),
      )
      .subscribe(() => this.router.navigate(['/train']));
  }
}
