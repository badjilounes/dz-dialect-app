import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule],
  declarations: [ProfilePage],
})
export class ProfileModule {}
