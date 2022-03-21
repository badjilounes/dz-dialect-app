import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable, of, shareReplay, tap } from 'rxjs';
import { DefaultService, ResponseSentences } from '../../../api';
import { HistoryStorageService } from '../../shared/business/storage/history-storage.service';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss'],
})
export class KeywordComponent implements OnInit {
  verbControl = new FormControl('', [Validators.required]);

  sentences$: Observable<ResponseSentences[] | undefined> = of();
  history$: Observable<ResponseSentences[]> = this.storage.history$;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly storage: HistoryStorageService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  generate(): void {
    if (this.verbControl.valid) {
      this.sentences$ = this.api.sentenceGenerateGet(5, undefined, [this.verbControl.value]).pipe(
        map((response) => response.sentences),
        tap((sentences) => (sentences || []).forEach((sentence) => this.storage.add(sentence))),
        catchError((error) => {
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
      );
    }
  }
}
