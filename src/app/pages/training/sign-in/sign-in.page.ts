import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { UserAppStore } from 'src/app/core/stores/user.app-store';
import {
  AuthenticationHttpService,
  AuthSignInDto,
  AuthSignUpDto,
} from 'src/clients/dz-dialect-identity-api';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
@UntilDestroy()
export class SignInPage {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  signUp = true;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authenticationHttpService: AuthenticationHttpService,
    private readonly userAppStore: UserAppStore,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  createUser(credentials: AuthSignUpDto): void {
    this.authenticationHttpService
      .signUp(credentials)
      .pipe(
        tap(() => this.snackBar.open('Votre compte a bien été créé !', 'OK', { duration: 3000 })),
        tap(() => (this.signUp = false)),
        catchError((error) => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  signInUser(credentials: AuthSignInDto): void {
    this.authenticationHttpService
      .signIn(credentials)
      .pipe(
        tap(({ token }) => this.userAppStore.setAsAuthenticated(token)),
        tap(() => this.router.navigate(['/train'])),
        catchError((error) => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  signInWith(provider: string) {
    this.authenticationHttpService
      .redirectToAuthorizeUrl(provider)
      .pipe(
        tap(({ url }) => (window.location = url)),
        catchError((error) => {
          this.snackBar.open(error.error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
