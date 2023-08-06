import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import {
  AuthenticationHttpService,
  AuthSignInDto,
  AuthSignUpDto,
} from 'src/clients/dz-dialect-identity-api';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
@UntilDestroy()
export class SignInPage implements OnInit {
  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  type: 'sign-in' | 'sign-up' = 'sign-in';

  constructor(
    private readonly _appStore: AppStore,
    private readonly _authenticationHttpService: AuthenticationHttpService,
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _location: Location,
    private readonly _router: Router,
    private readonly _snackBar: MatSnackBar,
    private readonly _theme: ThemeService,
  ) {}

  ngOnInit(): void {
    this._theme.applyThemeToStatusBar();
  }

  back(): void {
    this._location.back();
  }

  createUser(credentials: AuthSignUpDto): void {
    this._authenticationHttpService
      .signUp(credentials)
      .pipe(
        tap(() => this._snackBar.open('Votre compte a bien été créé !', 'OK', { duration: 3000 })),
        tap(() => (this.type = 'sign-in')),
        catchError((error) => {
          this._snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  signInUser(credentials: AuthSignInDto): void {
    this._authenticationHttpService
      .signIn(credentials)
      .pipe(
        tap(({ token }) => this._appStore.setAsAuthenticated(token)),
        tap(() => this._router.navigate(['/train'])),
        catchError((error) => {
          this._snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  signInWith(provider: string): void {
    this._authenticationHttpService
      .redirectToAuthorizeUrl(provider)
      .pipe(
        tap(({ url }) => (window.location.href = url)),
        catchError((error) => {
          this._snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
