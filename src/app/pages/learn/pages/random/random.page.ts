import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { TranslationBlocComponent } from 'src/app/shared/business/translation-bloc/translation-bloc.component';
import { CardComponent } from 'src/app/shared/design-system/card/card.component';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { StorageModule } from 'src/app/shared/technical/storage/storage.module';
import { SentenceHttpService, SentenceResponseDto } from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    StorageModule,
    TranslateModule,
    TranslationBlocComponent,
    CardComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    CapitalizeModule,
    MatProgressSpinnerModule,
    LetModule,
  ],
})
export class RandomPage {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  sentence$: Observable<SentenceResponseDto | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly sentenceApi: SentenceHttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  generate(): void {
    this.loading$.next(true);

    this.sentence$ = this.sentenceApi.getSentenceList(1).pipe(
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
