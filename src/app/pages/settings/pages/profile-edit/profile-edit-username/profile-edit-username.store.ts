import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { Observable, repeat, switchMap, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

type ProfileEditUsernameState = {
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileEditUsernameStore
  extends ComponentStore<ProfileEditUsernameState>
  implements OnStoreInit
{
  readonly username$: Observable<string> = this.select((state) => state.username);

  constructor(
    private readonly usersHttpService: UsersHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly appStore: AppStore,
    private readonly router: Router,
  ) {
    super({
      username: '',
    });
  }

  ngrxOnStoreInit() {
    this.usersHttpService
      .getConnectedUser()
      .pipe(tap((user) => this.patchState({ username: user.username })))
      .subscribe();
  }

  undoChanges = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => {
        const username = this.get().username;
        this.patchState(() => ({ username: '' }));
        this.patchState(() => ({ username }));
      }),
    );
  });

  saveChanges = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      switchMap((username) => this.usersHttpService.updateUsername({ username })),
      tapResponse(
        (user) => {
          this.appStore.initStore();
          this.patchState(() => ({ username: user.username }));
          this.snackBar.open("Nom d'utilisateur modifié", 'OK', { duration: 2000 });
          this.router.navigate(['/settings/profile']);
        },
        ({ error }: HttpErrorResponse) =>
          this.snackBar.open(error.message, 'OK', { duration: 2000 }),
      ),
      repeat(),
    );
  });
}
