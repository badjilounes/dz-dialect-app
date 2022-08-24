import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { BehaviorSubject, tap } from 'rxjs';
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
  ],
})
export class ProfilePictureUploadDialogComponent {
  isHandset$ = this.appStore.isHandset$;

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
  ) {}

  onSelect(event: NgxDropzoneChangeEvent) {
    console.log(event);

    this.usersHttpService
      .createProfilePictureMedia(event.addedFiles[0], 'body', true)
      .pipe(untilDestroyed(this))
      .subscribe((uploaded) => {
        this.picture$.next(uploaded.url);
      });
  }

  save() {
    this.usersHttpService
      .updateProfilePicture({ url: this.picture$.value })
      .pipe(
        tap(() => this.dialog.close()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  cancel() {
    this.picture$.next(this.initialPicture);
  }
}
