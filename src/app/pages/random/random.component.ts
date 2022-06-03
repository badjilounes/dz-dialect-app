import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { DefaultService, ResponseSentences } from 'src/api';
import { HistoryStorageService } from '../../shared/business/storage/history-storage.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    private readonly storage: HistoryStorageService,
  ) {
    this.storage.clear();
  }

  generate(): void {
    this.loading$.next(true);

    this.sentence$ = this.api.generateSentenceGet().pipe(
      map((response) => response.sentences?.[0]),
      tap((sentence) => this.storage.add(sentence)),
      tap(() => this.loading$.next(false)),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
