import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationPage } from './presentation.page';

const routes: Routes = [{ path: '', component: PresentationPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresentationRoutingModule {}
