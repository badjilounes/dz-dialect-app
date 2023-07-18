import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StopClickPropagationDirective } from './stop-click-propagation.directive';
import { PreventClickDirective } from './prevent-click.directive';

@NgModule({
  imports: [CommonModule, StopClickPropagationDirective, PreventClickDirective],
  exports: [StopClickPropagationDirective, PreventClickDirective],
})
export class BehaviorModule {}
