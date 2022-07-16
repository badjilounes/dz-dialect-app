import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingLayoutComponent } from './training-layout/training-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'learn', pathMatch: 'full' },

  {
    path: 'train',
    component: TrainingLayoutComponent,
    loadChildren: () => import('./train/train.module').then((m) => m.TrainModule),
  },

  {
    path: 'learn',
    component: TrainingLayoutComponent,
    loadChildren: () => import('./learn/learn.module').then((m) => m.LearnModule),
  },

  {
    path: 'sign-in',
    component: TrainingLayoutComponent,
    loadChildren: () => import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
