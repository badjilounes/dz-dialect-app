import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { SentenceControllerHttpService } from 'src/clients/dz-dialect-api';
import { TrainingService } from '../../training.service';

@Component({
  selector: 'app-training-result',
  templateUrl: './training-result.component.html',
  styleUrls: ['./training-result.component.scss'],
})
@UntilDestroy()
export class TrainingResultComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get score(): number {
    return this.trainingService.score;
  }

  get total(): number {
    return this.trainingService.nbSteps;
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly api: SentenceControllerHttpService,
    private readonly trainingService: TrainingService,
    private readonly snackBar: MatSnackBar,
  ) {}

  restartTraining(): void {
    this.loading$.next(true);
    this.api
      .generateRandomSentence(this.trainingService.nbSteps)
      .pipe(
        tap((sentences) => this.trainingService.init(sentences)),
        tap(() => this.loading$.next(false)),
        tap(() => this.router.navigate(['/test/start'])),
        catchError((error) => {
          this.loading$.next(false);
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
