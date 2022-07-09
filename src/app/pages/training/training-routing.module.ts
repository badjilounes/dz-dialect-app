import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'presentation', pathMatch: 'full' },
  {
    path: 'presentation',
    loadChildren: () =>
      import('./training-presentation/training-presentation.module').then(
        (m) => m.TrainingPresentationModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
