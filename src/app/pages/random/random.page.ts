import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { SentenceControllerHttpService, SentenceDTO } from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  sentence$: Observable<SentenceDTO | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  generate(): void {
    this.loading$.next(true);

    this.sentence$ = this.api.generateRandomSentence().pipe(
      map(([firstSentence]) => firstSentence),
      tap(() => this.loading$.next(false)),
      catchError((error) => {
        this.loading$.next(false);
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
