import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPage } from './exam.page';

const routes: Routes = [{ path: ':examId', component: ExamPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
