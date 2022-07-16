import { NgModule } from '@angular/core';
import { TrainingLayoutModule } from './training-layout/training-layout.module';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingPage } from './training.page';

@NgModule({
  declarations: [TrainingPage],
  imports: [TrainingRoutingModule, TrainingLayoutModule],
})
export class TrainingModule {}
