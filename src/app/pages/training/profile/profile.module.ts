import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfileStatisticsComponent } from './components/profile-statistics/profile-statistics.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, ProfileInformationComponent, MatButtonModule],
  declarations: [ProfilePage, ProfileStatisticsComponent, ProfileFriendsComponent],
})
export class ProfileModule {}
