import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedLayoutComponent } from './core/unauthenticated-layout/unauthenticated-layout.component';
import { KeywordComponent } from './pages/keyword/keyword.page';
import { RandomComponent } from './pages/random/random.page';
import { TrainingPresentationPage } from './pages/training-presentation/training-presentation.page';

const routes: Routes = [
  { path: '', redirectTo: 'random', pathMatch: 'full' },

  {
    path: '',
    component: UnauthenticatedLayoutComponent,
    children: [
      {
        path: 'random',
        component: RandomComponent,
        data: { menu: true, title: 'random.menu.title' },
      },
      {
        path: 'keyword',
        component: KeywordComponent,
        data: { menu: true, title: 'keyword.menu.title' },
      },
      {
        path: 'training-presentation',
        component: TrainingPresentationPage,
        data: { menu: true, title: 'training.menu.title' },
      },
    ],
  },

  {
    path: '',
    loadChildren: () => import('./pages/training/training.module').then((m) => m.TrainingModule),
  },

  { path: '**', redirectTo: 'random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
