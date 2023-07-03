import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppStore } from 'src/app/app.store';
import { filterUndefined } from 'src/app/shared/technical/operators/filter-undefined.operator';
import {
  ProfileInformation,
  ProfileInformationComponent,
} from './components/profile-information/profile-information.component';
import { ProfilePictureUploadDialogComponent } from './components/profile-picture-upload-dialog/profile-picture-upload-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProfileInformationComponent,
    MatButtonModule,
    ProfilePictureUploadDialogComponent,
  ],
})
export class ProfilePage {
  userInformation$: Observable<ProfileInformation> = this.appStore.user$.pipe(
    filterUndefined(),
    map((user) => ({
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      friendsCount: 0,
      picture: user.imageUrl,
      email: user.email,
    })),
  );

  constructor(private readonly appStore: AppStore, private readonly router: Router) {}

  logOut() {
    this.appStore.setAsUnAuthenticated();
    this.router.navigate(['/train']);
  }
}
