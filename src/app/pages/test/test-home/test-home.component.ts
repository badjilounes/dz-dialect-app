import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { SentenceControllerHttpService } from 'src/clients/dz-dialect-api';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.scss'],
})
@UntilDestroy()
export class TestHomeComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly api: SentenceControllerHttpService,
    private readonly testService: TestService,
    private readonly snackBar: MatSnackBar,
  ) {}

  startTraining(): void {
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
