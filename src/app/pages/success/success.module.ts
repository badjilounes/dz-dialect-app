import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SuccessRoutingModule } from './success-routing.module';
import { SuccessPage } from './success.page';

@NgModule({
  imports: [CommonModule, SuccessRoutingModule, SuccessPage],
})
export class SuccessModule {}
