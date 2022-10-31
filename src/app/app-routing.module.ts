import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShouldNotShowPresentationGuard } from 'src/app/core/presentation/should-not-show-presentation.guard';
import { OverviewPage } from 'src/app/pages/overview/overview.page';
import { AuthenticatedGuard } from './core/authentication/authenticated.guard';
import { UnauthenticatedGuard } from './core/authentication/unauthenticated.guard';
import { AppLayoutComponent } from './core/layout/app-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },

  {
    path: 'overview',
    canActivate: [UnauthenticatedGuard],
    component: OverviewPage,
    data: { title: 'training.menu.title' },
  },

  {
    path: 'training-presentation',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () =>
      import('./pages/training-presentation/training-presentation.module').then(
        (m) => m.TrainingPresentationModule,
      ),
    data: { title: 'training.menu.title' },
  },

  {
    path: 'presentation',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () =>
      import('./pages/presentation/presentation.module').then(
        (m) => m.PresentationModule,
      ),
    data: { title: 'training.menu.title' },
  },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [ShouldNotShowPresentationGuard],
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
