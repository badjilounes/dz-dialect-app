import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnPage } from './learn.page';
import { KeywordPage } from './pages/keyword/keyword.page';
import { RandomPage } from './pages/random/random.page';

const routes: Routes = [
  { path: '', redirectTo: 'random', pathMatch: 'full' },

  {
    path: '',
    component: LearnPage,
    children: [
      { path: 'random', component: RandomPage, data: { title: 'learn.title' } },
      { path: 'keyword', component: KeywordPage, data: { title: 'learn.title' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnRoutingModule {}
