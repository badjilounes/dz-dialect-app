import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LetModule } from '@ngrx/component';
import { TrainRoutingModule } from './train-routing.module';
import { TrainPage } from './train.page';

@NgModule({
  declarations: [TrainPage],
  imports: [CommonModule, TrainRoutingModule, LetModule],
})
export class TrainModule {}
