import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingLayoutComponent } from './training-layout/training-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'learn', pathMatch: 'full' },

  {
    path: '',
    component: TrainingLayoutComponent,
    children: [
      {
        path: 'learn',
        loadChildren: () => import('./learn/learn.module').then((m) => m.LearnModule),
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: 'train',
        loadChildren: () => import('./train/train.module').then((m) => m.TrainModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
