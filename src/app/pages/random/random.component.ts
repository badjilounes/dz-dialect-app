import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { DefaultService, ResponseSentences } from 'src/api';
import { RandomStorageService } from './random-storage.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent {
  sentence$: Observable<ResponseSentences | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  history$: Observable<ResponseSentences[]> = this.storage.history$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly snackBar: MatSnackBar,
    private readonly storage: RandomStorageService,
  ) {
    this.storage.clear();
  }

  generate(): void {
    this.sentence$ = this.api.sentenceGenerateGet().pipe(
      map((response) => response.sentences?.[0]),
      tap((sentence) => this.storage.add(sentence)),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
