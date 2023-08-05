import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/authentication/authenticated.guard';
import { UnauthenticatedGuard } from './core/authentication/unauthenticated.guard';
import { AppLayoutComponent } from './core/layout/app-layout.component';
import { LogoutComponent } from './pages/logout/logout.component';

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
      {
        path: 'profile',
        canActivate: [AuthenticatedGuard],
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
        data: { title: 'profile.title' },
      },
    ],
  },

  {
    path: 'exam',
    loadChildren: () => import('./pages/exam/exam.module').then((m) => m.ExamModule),
  },

  {
    path: 'sign-in',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },

  {
    path: 'logout',
    component: LogoutComponent,
  },

  { path: '**', redirectTo: 'random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
