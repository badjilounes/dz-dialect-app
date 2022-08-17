import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { UserResponseDto, UsersHttpService } from 'src/clients/dz-dialect-identity-api';
import { AuthenticationTokenService } from './core/authentication/authentication-token.service';

enum AuthenticationStatus {
  AUTHENTICATED,
  UNAUTHENTICATED,
  PENDING,
}

type UserAppStoreState = {
  currentUser: UserResponseDto | undefined;
  authenticationStatus: AuthenticationStatus;
};

@Injectable({
  providedIn: 'root',
})
export class AppStore extends ComponentStore<UserAppStoreState> {
  readonly isAuthenticated$: Observable<boolean> = this.select(
    (state) => state.authenticationStatus,
  ).pipe(
    filter((isAuthenticated) => isAuthenticated !== AuthenticationStatus.PENDING),
    map((isAuthenticated) => isAuthenticated === AuthenticationStatus.AUTHENTICATED),
  );

  readonly user$: Observable<UserResponseDto | undefined> = this.select(
    (state) => state.currentUser,
  );

  constructor(
    private readonly usersHttpService: UsersHttpService,
    private readonly tokenService: AuthenticationTokenService,
  ) {
    super({
      authenticationStatus: AuthenticationStatus.PENDING,
      currentUser: undefined,
    });
  }

  initStore(): void {
    this.usersHttpService
      .getConnectedUser()
      .pipe(
        tap((currentUser) =>
          this.patchState(() => ({
            currentUser,
            authenticationStatus: AuthenticationStatus.AUTHENTICATED,
          })),
        ),
        catchError(() => {
          this.setAsUnAuthenticated();
          return EMPTY;
        }),
      )
      .subscribe();
  }

  setAsUnAuthenticated(): void {
    this.tokenService.clearToken();

    this.patchState(() => ({
      currentUser: undefined,
      authenticationStatus: AuthenticationStatus.UNAUTHENTICATED,
    }));
  }

  setAsAuthenticated(token: string): void {
    this.tokenService.setToken(token);

    this.initStore();
  }
}
