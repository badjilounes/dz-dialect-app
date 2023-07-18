import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePage } from 'src/app/pages/user-profile/user-profile.page';
import { SuccessPage } from './pages/success/success.page';

const routes: Routes = [
  { path: '', redirectTo: 'profile/me', pathMatch: 'full' },

  { path: 'me', component: UserProfilePage },

  { path: 'success', component: SuccessPage },

  { path: '**', redirectTo: 'profile/me' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
