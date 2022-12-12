import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TranslationBlocComponent } from 'src/app/shared/business/translation-bloc/translation-bloc.component';
import { CardComponent } from 'src/app/shared/design-system/card/card.component';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { SentenceHttpService, SentenceResponseDto } from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.page.html',
  styleUrls: ['./keyword.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    MatFormFieldModule,
    TranslateModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CapitalizeModule,
    TranslationBlocComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    LetModule,
    MatButtonModule,
  ],
})
export class KeywordPage {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sentences$: Observable<SentenceResponseDto[] | undefined> = of();
  filteredOptions$: Observable<string[]> = of([]);

  verbControl = new FormControl<string>('', [Validators.required]);

  tenseControl = new FormControl<string[]>([]);
  tenses$: Observable<string[]> = of([]);

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly sentenceApi: SentenceHttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.sentenceApi.getVerbList().pipe(
      switchMap((verbs) =>
        this.verbControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(verbs, value ?? '')),
        ),
      ),
    );

    this.tenses$ = this.sentenceApi.getTenseList();
  }

  private _filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  generate(): void {
    if (this.verbControl.valid) {
      this.loading$.next(true);

      this.sentences$ = this.sentenceApi
        .getSentenceList(
          5,
          this.verbControl.value ? [this.verbControl.value] : [],
          this.tenseControl.value ? this.tenseControl.value : [],
        )
        .pipe(
          tap(() => this.loading$.next(false)),
          catchError((error) => {
            this.loading$.next(false);
            this.snackBar.open(error.message, 'OK', { duration: 3000 });
            return EMPTY;
          }),
        );
    }
  }
}
