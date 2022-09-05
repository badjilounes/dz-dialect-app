import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';

@UntilDestroy()
@Component({
  selector: 'app-profile-picture-upload-dialog',
  templateUrl: './profile-picture-upload-dialog.component.html',
  styleUrls: ['./profile-picture-upload-dialog.component.scss'],
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
export class ProfilePictureUploadDialogComponent {
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
    private readonly dialog: MatDialogRef<ProfilePictureUploadDialogComponent>,
    private readonly snackBar: MatSnackBar,
  ) {}

  onSelect(event: NgxDropzoneChangeEvent) {
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

  save() {
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

  cancel() {
    this.picture$.next(this.initialPicture);
  }
}
