import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import {
  SentenceControllerHttpService,
  SentenceDTO,
  VerbControllerHttpService,
} from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
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
export class KeywordComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sentences$: Observable<SentenceDTO[] | undefined> = of();
  filteredOptions$: Observable<string[]> = of([]);

  verbControl = new FormControl<string>('', [Validators.required]);
  verbOptions: string[] = [];

  tenseControl = new FormControl<string>('');
  tenses = ['past', 'present', 'future', 'imperative'];

  get selectedTense(): string | undefined {
    return this.tenseControl.value || undefined;
  }

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly verbsApi: VerbControllerHttpService,
    private readonly sentenceApi: SentenceControllerHttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.verbsApi.getAllVerbIds().pipe(
      map((verbsSet) => Array.from(verbsSet)),
      tap((verbs) => (this.verbOptions = verbs)),
      switchMap((verbs) =>
        this.verbControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(verbs, value ?? '')),
        ),
      ),
    );
  }

  private _filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    return options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  generate(): void {
    if (this.verbControl.valid) {
      this.loading$.next(true);

      this.sentences$ = this.sentenceApi
        .generateRandomSentence(
          5,
          undefined,
          undefined,
          this.verbControl.value?.toLowerCase(),
          this.selectedTense,
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
