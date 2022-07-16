import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StopClickPropagationDirective } from './stop-click-propagation.directive';

@NgModule({
  declarations: [StopClickPropagationDirective],
  imports: [CommonModule],
  exports: [StopClickPropagationDirective],
})
export class BehaviorModule {}
