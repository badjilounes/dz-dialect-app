import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LetModule } from '@ngrx/component';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';

@NgModule({
  declarations: [SignInPage],
  imports: [CommonModule, SignInRoutingModule, AppTranslateModule.forChild(), LetModule],
})
export class SignInModule {}
