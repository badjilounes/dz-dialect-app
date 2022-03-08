import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DefaultService, ResponseSentences } from 'src/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  sentences$: Observable<ResponseSentences[] | undefined> = of();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly api: DefaultService,
    private readonly snackBar: MatSnackBar,
  ) {}

  generate(): void {
    this.sentences$ = this.api.sentenceGenerateGet().pipe(
      map((response) => response.sentences),
      catchError((error) => {
        this.snackBar.open(error.message, 'OK', { duration: 3000 });
        return EMPTY;
      }),
    );
  }
}
