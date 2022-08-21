import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SuccessPageComponent} from "./success-page.component";
import {SuccessRoutingModule} from "./success-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SuccessRoutingModule
  ],
  declarations: [SuccessPageComponent],
})
export class SuccessModule {}
