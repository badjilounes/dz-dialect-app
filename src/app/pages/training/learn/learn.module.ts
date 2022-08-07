import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { KeywordModule } from '../../keyword/keyword.module';
import { RandomModule } from '../../random/random.module';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnPage } from './learn.page';

@NgModule({
  declarations: [LearnPage],
  imports: [
    CommonModule,
    TranslateModule,
    LearnRoutingModule,
    LetModule,
    MatButtonToggleModule,
    KeywordModule,
    RandomModule,
  ],
})
export class LearnModule {}
