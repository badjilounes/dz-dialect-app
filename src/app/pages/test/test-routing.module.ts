import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestHomeComponent } from './pages/test-home/test-home.component';
import { TestResultComponent } from './pages/test-result/test-result.component';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  { path: '', component: TestHomeComponent },
  { path: 'start', component: TestComponent },
  { path: 'result', component: TestResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
