import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './core/menu/menu.component';
import { KeywordComponent } from './pages/keyword/keyword.component';
import { RandomComponent } from './pages/random/random.component';
import { TestComponent } from './pages/test/test.component';

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
        path: 'test',
        component: TestComponent,
        data: { menu: true, title: 'test.menu.title' },
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
