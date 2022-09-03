import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';
import { ProfileInformationComponent } from './components/profile-information/profile-information.component';
import { ProfilePictureUploadDialogComponent } from './components/profile-picture-upload-dialog/profile-picture-upload-dialog.component';
import { ProfileSuccessComponent } from './components/profile-success/profile-success.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileInformationComponent,
    ProfileSuccessComponent,
    MatButtonModule,
    ProfilePictureUploadDialogComponent,
  ],
  declarations: [ProfilePage, ProfileFriendsComponent],
})
export class ProfileModule {}
