import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogModule as MatDialogModule,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import {
  MatLegacySnackBar as MatSnackBar,
  MatLegacySnackBarModule as MatSnackBarModule,
} from '@angular/material/legacy-snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

@UntilDestroy()
@Component({
  selector: 'app-profile-edit-picture',
  templateUrl: './profile-edit-picture.component.html',
  styleUrls: ['./profile-edit-picture.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    LetModule,
    NgxDropzoneModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class ProfileEditPictureComponent {
  isHandset$ = this.appStore.isHandset$;
  uploading$ = new BehaviorSubject<boolean>(false);
  saving$ = new BehaviorSubject<boolean>(false);

  initialPicture = this.data?.picture || '/assets/images/unknown-user.png';
  picture$: BehaviorSubject<string> = new BehaviorSubject<string>(this.initialPicture);

  get uploaded(): boolean {
    return this.picture$.value !== this.initialPicture;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { picture?: string },
    private readonly appStore: AppStore,
    private readonly usersHttpService: UsersHttpService,
    private readonly dialog: MatDialogRef<ProfileEditPictureComponent>,
    private readonly snackBar: MatSnackBar,
  ) {}

  onSelect(event: NgxDropzoneChangeEvent): void {
    this.uploading$.next(true);

    this.usersHttpService
      .createProfilePictureMedia(event.addedFiles[0], 'body', true)
      .pipe(
        tap(({ url }) => this.picture$.next(url)),
        tap(() => this.uploading$.next(false)),
        catchError((error) => {
          this.uploading$.next(false);
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  save(): void {
    this.saving$.next(true);

    this.usersHttpService
      .updateProfilePicture({ url: this.picture$.value })
      .pipe(
        tap(() => this.saving$.next(false)),
        tap(() => this.dialog.close()),
        catchError((error) => {
          this.saving$.next(false);
          this.snackBar.open(error.message, 'OK', { duration: 3000 });
          return EMPTY;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  cancel(): void {
    this.picture$.next(this.initialPicture);
  }
}
