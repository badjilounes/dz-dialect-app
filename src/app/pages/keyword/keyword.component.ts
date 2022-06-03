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
import { DefaultService, ResponseSentences } from '../../../api';
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

  sentences$: Observable<ResponseSentences[] | undefined> = of();
  history$: Observable<ResponseSentences[]> = this.storage.history$;

  verbControl = new FormControl('', [Validators.required]);
  tensesControl = new FormControl([]);
  tenses = ['PAST', 'PRESENT', 'FUTURE', 'IMPERATIVE'];

  filteredOptions$: Observable<string[]> = of([]);
  verbOptions$: Observable<string[]> = this.api
    .getElementsGet()
    .pipe(map((response) => response.verbs));

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly storage: HistoryStorageService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.verbControl.valueChanges.pipe(
      startWith(''),
      switchMap((filter) =>
        this.verbOptions$.pipe(map((options) => this._filter(options, filter))),
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

      this.sentences$ = this.api
        .generateSentenceGet(5, this.tensesControl.value, [this.verbControl.value.toLowerCase()])
        .pipe(
          map((response) => response.sentences),
          tap((sentences) => (sentences || []).forEach((sentence) => this.storage.add(sentence))),
          tap(() => this.loading$.next(false)),
          catchError((error) => {
            this.snackBar.open(error.message, 'OK', { duration: 3000 });
            return EMPTY;
          }),
        );
    }
  }
}
