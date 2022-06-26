import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingHomeComponent } from './pages/training-home/training-home.component';
import { TrainingResultComponent } from './pages/training-result/training-result.component';
import { TrainingComponent } from './pages/training/training.component';

const routes: Routes = [
  { path: '', component: TrainingHomeComponent },
  { path: 'start', component: TrainingComponent },
  { path: 'result', component: TrainingResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
