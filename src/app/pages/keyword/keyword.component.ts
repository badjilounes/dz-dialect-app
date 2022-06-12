import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
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
import { HistoryStorageService } from '../../shared/business/storage/history-storage.service';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss'],
})
export class KeywordComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  sentences$: Observable<SentenceDTO[] | undefined> = of();
  history$: Observable<SentenceDTO[]> = this.storage.history$;

  verbControl = new FormControl<string>('', [Validators.required]);
  tensesControl = new FormControl<string[]>([]);
  tenses = ['PAST', 'PRESENT', 'FUTURE', 'IMPERATIVE'];

  get selectedTenses(): string[] {
    return this.tensesControl.value ?? [];
  }

  get firstTenseSelected(): string {
    return this.selectedTenses[0] ? this.selectedTenses[0] : '';
  }

  filteredOptions$: Observable<string[]> = of([]);
  verbOptions$: Observable<string[]> = this.verbsApi
    .getAllVerbIds()
    .pipe(map((verbsSet) => Array.from(verbsSet)));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly verbsApi: VerbControllerHttpService,
    private readonly sentenceApi: SentenceControllerHttpService,
    private readonly storage: HistoryStorageService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.verbControl.valueChanges.pipe(
      startWith(null),
      switchMap((filter: string | null) =>
        this.verbOptions$.pipe(
          map((options: string[]) => this._filter(options ?? [], filter ?? '')),
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
          this.verbControl.value?.toLowerCase(),
          this.tensesControl.value?.join(','),
        )
        .pipe(
          tap((sentences) => sentences.forEach((sentence) => this.storage.add(sentence))),
          tap(() => this.loading$.next(false)),
          catchError((error) => {
            this.snackBar.open(error.message, 'OK', { duration: 3000 });
            return EMPTY;
          }),
        );
    }
  }
}
