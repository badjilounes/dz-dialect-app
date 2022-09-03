import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/authentication/authenticated.guard';
import { TrainingLayoutComponent } from './pages/training-layout/training-layout.component';
import { TrainingPresentationPage } from './pages/training-presentation/training-presentation.page';

const routes: Routes = [
  { path: '', redirectTo: 'training-presentation', pathMatch: 'full' },

  {
    path: 'training-presentation',
    component: TrainingPresentationPage,
    data: { menu: true, title: 'training.menu.title' },
  },

  {
    path: '',
    component: TrainingLayoutComponent,
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
        path: 'profile',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
        data: { title: 'profile.title' },
      },
      {
        path: 'success',
        canActivate: [AuthenticatedGuard],
        loadChildren: () => import('./pages/success/success.module').then((m) => m.SuccessModule),
        data: { title: 'success.title' },
      },
    ],
  },

  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },

  { path: '**', redirectTo: 'random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
