import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { SentenceControllerHttpService, SentenceDTO } from 'src/clients/dz-dialect-api';
import { HistoryStorageService } from '../../shared/business/storage/history-storage.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
})
export class RandomComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  sentence$: Observable<SentenceDTO | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  history$: Observable<SentenceDTO[]> = this.storage.history$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly storage: HistoryStorageService,
  ) {
    this.storage.clear();
  }

  generate(): void {
    this.loading$.next(true);

    this.sentence$ = this.api.generateRandomSentence().pipe(
      map(([firstSentence]) => firstSentence),
      tap((sentence) => this.storage.add(sentence)),
      tap(() => this.loading$.next(false)),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
