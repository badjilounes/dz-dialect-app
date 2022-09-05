import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
