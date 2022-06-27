import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './core/menu/menu.component';
import { KeywordComponent } from './pages/keyword/keyword.component';
import { RandomComponent } from './pages/random/random.component';

const routes: Routes = [
  { path: '', redirectTo: 'random', pathMatch: 'full' },

  {
    path: '',
    component: MenuComponent,
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
        path: 'training',
        loadChildren: () =>
          import('./pages/training/training.module').then((m) => m.TrainingModule),
        data: { menu: true, title: 'training.menu.title' },
      },
    ],
  },

  { path: '**', redirectTo: 'random' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
