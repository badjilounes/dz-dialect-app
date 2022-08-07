import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import {
  SentenceControllerHttpService,
  SentenceDTO,
  VerbControllerHttpService,
} from 'src/clients/dz-dialect-api';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.page.html',
  styleUrls: ['./keyword.page.scss'],
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
