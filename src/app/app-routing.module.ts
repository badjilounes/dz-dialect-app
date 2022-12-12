import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/authentication/authenticated.guard';
import { UnauthenticatedGuard } from './core/authentication/unauthenticated.guard';
import { AppLayoutComponent } from './core/layout/app-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },

  {
    path: 'overview',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./pages/overview/overview.module').then((m) => m.OverviewModule),
    data: { title: 'training.menu.title' },
  },

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'learn',
        loadChildren: () => import('./pages/learn/learn.module').then((m) => m.LearnModule),
        data: { title: 'learn.title' },
      },
      {
        path: 'train',
        loadChildren: () => import('./pages/train/train.module').then((m) => m.TrainModule),
        data: { title: 'train.title' },
      },
      {
        path: 'settings',
        canActivate: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pages/settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },

  {
    path: 'sign-in',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },

  { path: '**', redirectTo: 'random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
