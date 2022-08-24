import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FullLineCardButtonComponent } from 'src/app/shared/business/full-line-card-button/full-line-card-button.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { ProfilePictureUploadDialogComponent } from '../profile-picture-upload-dialog/profile-picture-upload-dialog.component';

export type ProfileInformation = {
  name: string;
  username: string;
  email: string;
  createdAt: string;
  friendsCount: number;
  picture: string;
};

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    FullLineCardButtonComponent,
    ProfileCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInformationComponent {
  @Input() information: ProfileInformation | null = null;

  constructor(private dialog: MatDialog, private readonly breakpointObserver: BreakpointObserver) {}

  openPictureUploadDialog() {
    const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset);

    const ref = this.dialog.open(ProfilePictureUploadDialogComponent, {
      data: { picture: this.information?.picture },
      height: isHandset ? '100%' : '65vh',
      width: isHandset ? '100%' : '50vw',
      maxWidth: isHandset ? '100%' : '80vw',
    });
  }
}