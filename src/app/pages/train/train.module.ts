import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LetModule } from '@ngrx/component';
import { TrainRoutingModule } from './train-routing.module';

@NgModule({
  imports: [CommonModule, TrainRoutingModule, LetModule],
})
export class TrainModule {}
