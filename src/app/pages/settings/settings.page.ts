import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import {
  ProfileInformation,
  ProfileInformationComponent,
} from './pages/profile-information/profile-information.component';
import { ProfileEditPictureComponent } from './pages/profile-edit/profile-edit-picture/profile-edit-picture.component';
import { Observable, map } from 'rxjs';
import { AppStore } from '../../app.store';
import { filterUndefined } from '../../shared/technical/operators/filter-undefined.operator';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { AppearanceComponent } from './pages/appearance/appearance.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatLegacyButtonModule,
    ProfileInformationComponent,
    ProfileEditPictureComponent,
    AppearanceComponent,
  ],
  hostDirectives: [PageLayoutDirective],
})
export class SettingsPage {
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

  logOut(): void {
    this.router.navigate(['/logout']);
  }
}
