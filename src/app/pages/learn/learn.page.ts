import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { TranslationBlocComponent } from 'src/app/shared/business/translation-bloc/translation-bloc.component';
import { CardComponent } from 'src/app/shared/design-system/card/card.component';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { SentenceHttpService, SentenceResponseDto } from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LetModule,
    CapitalizeModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    TranslationBlocComponent,
    CardComponent,
  ],
})
export class LearnPage implements OnInit {
  isHandset$ = this.appStore.isHandset$;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sentences$: Observable<SentenceResponseDto[]> = of([]);
  tenses$: Observable<string[]> = of([]);
  verbs$: Observable<string[]> = of([]);

  formGroup = new FormGroup({
    verbs: new FormControl<string>(''),
    tense: new FormControl<string[]>([]),
    number: new FormControl<number>(1, [Validators.min(1), Validators.max(10)]),
  });

  constructor(
    private readonly appStore: AppStore,
    private readonly sentenceApi: SentenceHttpService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.verbs$ = this.sentenceApi.getVerbList().pipe(
      switchMap((verbs) =>
        this.formGroup.controls.verbs.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(verbs, value ?? '')),
        ),
      ),
    );

    this.tenses$ = this.sentenceApi.getTenseList();
  }

  generate(): void {
    this.loading$.next(true);

    const { verbs, tense, number } = this.formGroup.value;
    this.sentences$ = this.sentenceApi
      .getSentenceList(number ?? 1, verbs ? [verbs] : undefined, tense ? tense : undefined)
      .pipe(
        tap(() => this.loading$.next(false)),
        catchError((error) => {
          this.loading$.next(false);
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
      );
  }

  private _filter(options: string[], value: string): string[] {
    return options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
  }
}
