import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { BehaviorSubject } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
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
  user$ = this.appStore.user$.pipe(filterUndefined());

  picture$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.data?.picture || '/assets/images/unknown-user.png',
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { picture?: string },
    private readonly appStore: AppStore,
    private readonly usersHttpService: UsersHttpService,
  ) {}

  onSelect(userId: string, event: NgxDropzoneChangeEvent) {
    console.log(event);

    this.usersHttpService
      .createProfilePictureMedia(userId, event.addedFiles[0], 'body', true)
      .pipe(untilDestroyed(this))
      .subscribe((uploaded) => {
        this.picture$.next(uploaded.url);
      });
  }
}
