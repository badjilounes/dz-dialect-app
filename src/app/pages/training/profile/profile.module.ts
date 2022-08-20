import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ProfileFriendsComponent} from './components/profile-friends/profile-friends.component';
import {ProfileInformationComponent} from './components/profile-information/profile-information.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfilePage} from './profile.page';
import {ProfileStatisticsComponent} from "./components/profile-statistics/profile-statistics.component";

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, ProfileInformationComponent, ProfileStatisticsComponent, MatButtonModule],
  declarations: [ProfilePage, ProfileFriendsComponent],
})
export class ProfileModule {
}
