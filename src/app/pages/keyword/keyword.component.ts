import {Component, OnInit} from '@angular/core';
import {catchError, EMPTY, map, Observable, of, shareReplay, tap} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DefaultService, ResponseSentences} from "../../../api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HistoryStorageService} from "../../shared/business/storage/history-storage.service";

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {

  keyword: any;
  sentences$: Observable<ResponseSentences | undefined> = of();

  constructor(private readonly breakpointObserver: BreakpointObserver,
              private readonly api: DefaultService,
              private readonly storage: HistoryStorageService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );


  generate(): void {
    this.sentences$ = this.api.sentenceGenerateGet(5,undefined,undefined,undefined,Array("keyword")).pipe(
      map((response) => response.sentences?.[0]),
      tap((sentence) => this.storage.add(sentence)),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }

}
