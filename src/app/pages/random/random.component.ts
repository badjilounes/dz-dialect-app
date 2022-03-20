import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable, of, shareReplay } from 'rxjs';
import { DefaultService, ResponseSentences } from 'src/api';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent {
  sentences$: Observable<ResponseSentences[] | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly snackBar: MatSnackBar,
  ) {}

  generate(): void {
    this.sentences$ = this.api.sentenceGenerateGet().pipe(
      map((response) => response.sentences),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
