import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingPresentationPage } from './training-presentation.page';

const routes: Routes = [{ path: '', component: TrainingPresentationPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPresentationRoutingModule {}
