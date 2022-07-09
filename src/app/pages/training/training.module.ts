import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingPage } from './training.page';

@NgModule({
  declarations: [TrainingPage],
  imports: [CommonModule, TrainingRoutingModule],
})
export class TrainingModule {}
