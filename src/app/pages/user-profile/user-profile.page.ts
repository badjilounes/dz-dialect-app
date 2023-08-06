import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { PageLayoutDirective } from '../../core/layout/directives/is-page-layout.directive';
import { StatisticListComponent } from './components/statistic-list/statistic-list.component';
import { SuccessListComponent } from './components/success-list/success-list.component';
import { UserProfileInformationComponent } from './components/user-profile-information/user-profile-information.component';
import { SUCCESS_ITEMS } from './components/success-list/success-items';
import { UserProfileToolbarComponent } from './components/user-profile-toolbar/user-profile-toolbar.component';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    UserProfileInformationComponent,
    SuccessListComponent,
    StatisticListComponent,
    UserProfileToolbarComponent,
  ],
  hostDirectives: [PageLayoutDirective],
})
export class UserProfilePage implements OnInit {
  items = SUCCESS_ITEMS;

  constructor(private readonly _theme: ThemeService) {}

  ngOnInit(): void {
    this._theme.applyThemeToStatusBar();
  }
}
