import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import {
  ProfileInformation,
  ProfileInformationComponent,
} from './components/profile-information/profile-information.component';
import { ProfileEditPictureComponent } from './pages/profile-edit/profile-edit-picture/profile-edit-picture.component';
import { Observable, map } from 'rxjs';
import { AppStore } from '../../app.store';
import { filterUndefined } from '../../shared/technical/operators/filter-undefined.operator';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { ThemeService } from '../../core/theme/theme.service';

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
export class SettingsPage implements OnInit {
  userInformation$: Observable<ProfileInformation> = this._appStore.user$.pipe(
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

  constructor(
    private readonly _appStore: AppStore,
    private readonly _router: Router,
    private readonly _theme: ThemeService,
  ) {}

  ngOnInit(): void {
    this._theme.applyThemeToStatusBar();
  }

  logOut(): void {
    this._router.navigate(['/logout']);
  }
}
