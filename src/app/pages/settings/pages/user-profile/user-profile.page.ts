import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { StatisticListComponent } from './components/statistic-list/statistic-list.component';
import { SuccessListComponent } from './components/success-list/success-list.component';
import { UserProfileInformationComponent } from './components/user-profile-information/user-profile-information.component';
import { SUCCESS_ITEMS } from './models/success-items';

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
  ],
})
export class UserProfilePage {
  items = SUCCESS_ITEMS;
}
