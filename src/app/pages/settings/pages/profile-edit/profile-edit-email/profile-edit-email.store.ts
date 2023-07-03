import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { Observable, repeat, switchMap, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

type ProfileEditEmailState = {
  email: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProfileEditEmailStore
  extends ComponentStore<ProfileEditEmailState>
  implements OnStoreInit
{
  readonly email$: Observable<string> = this.select((state) => state.email);

  constructor(
    private readonly usersHttpService: UsersHttpService,
    private readonly snackBar: MatSnackBar,
    private readonly appStore: AppStore,
    private readonly router: Router,
  ) {
    super({
      email: '',
    });
  }

  ngrxOnStoreInit() {
    this.usersHttpService
      .getConnectedUser()
      .pipe(tap((user) => this.patchState({ email: user.email })))
      .subscribe();
  }

  undoChanges = this.effect((save$: Observable<void>) => {
    return save$.pipe(
      tap(() => {
        const email = this.get().email;
        this.patchState(() => ({ email: '' }));
        this.patchState(() => ({ email }));
      }),
    );
  });

  saveChanges = this.effect((save$: Observable<string>) => {
    return save$.pipe(
      switchMap((email) => this.usersHttpService.updateEmail({ email })),
      tapResponse(
        (user) => {
          this.appStore.initStore();
          this.patchState(() => ({ email: user.email }));
          this.snackBar.open('Adresse e-mail modifiée', 'OK', { duration: 2000 });
          this.router.navigate(['/settings/profile']);
        },
        ({ error }: HttpErrorResponse) =>
          this.snackBar.open(error.message, 'OK', { duration: 2000 }),
      ),
      repeat(),
    );
  });
}
