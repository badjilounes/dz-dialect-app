import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { SentenceControllerHttpService } from 'src/clients/dz-dialect-api';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
@UntilDestroy()
export class TestResultComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  get score(): number {
    return this.testService.score;
  }

  get total(): number {
    return this.testService.nbSteps;
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly api: SentenceControllerHttpService,
    private readonly testService: TestService,
    private readonly snackBar: MatSnackBar,
  ) {}

  restartTraining(): void {
    this.loading$.next(true);
    this.api
      .generateRandomSentence(this.testService.nbSteps)
      .pipe(
        tap((sentences) => this.testService.init(sentences)),
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
