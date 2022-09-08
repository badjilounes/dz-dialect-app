import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEditEmailPage } from './pages/profile-edit/profile-edit-email/profile-edit-email.page';
import { ProfileEditNamePage } from './pages/profile-edit/profile-edit-name/profile-edit-name.page';
import { ProfileEditUsernamePage } from './pages/profile-edit/profile-edit-username/profile-edit-username.page';
import { ProfileEditPage } from './pages/profile-edit/profile-edit.page';
import { ProfilePage } from './pages/profile/profile.page';
import { SuccessPage } from './pages/success/success.page';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },

  {
    path: '',
    component: SettingsPage,
    children: [
      { path: 'profile', component: ProfilePage, data: { title: 'settings.title' } },
      { path: 'success', component: SuccessPage, data: { title: 'settings.title' } },
    ],
  },

  {
    path: 'profile',
    component: ProfileEditPage,
    children: [
      {
        path: 'name',
        component: ProfileEditNamePage,
        data: { title: 'profile-edit.name.title', subtitle: 'profile-edit.name.subtitle' },
      },
      {
        path: 'email',
        component: ProfileEditEmailPage,
        data: { title: 'profile-edit.email.title', subtitle: 'profile-edit.email.subtitle' },
      },
      {
        path: 'username',
        component: ProfileEditUsernamePage,
        data: { title: 'profile-edit.username.title', subtitle: 'profile-edit.username.subtitle' },
      },
    ],
  },

  { path: '**', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
