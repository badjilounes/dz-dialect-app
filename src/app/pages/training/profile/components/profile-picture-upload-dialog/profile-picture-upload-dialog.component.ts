import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { AppStore } from 'src/app/app.store';

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
  ],
})
export class ProfilePictureUploadDialogComponent implements OnInit {
  isHandset$ = this.appStore.isHandset$;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { picture?: string },
    private readonly appStore: AppStore,
  ) {}

  ngOnInit(): void {}
}
