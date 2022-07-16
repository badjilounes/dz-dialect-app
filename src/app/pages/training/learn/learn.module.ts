import { NgModule } from '@angular/core';

import { LetModule } from '@ngrx/component';
import { KeywordModule } from '../../keyword/keyword.module';
import { LearnRoutingModule } from './learn-routing.module';
import { LearnPage } from './learn.page';

@NgModule({
  declarations: [LearnPage],
  imports: [LearnRoutingModule, LetModule, KeywordModule],
})
export class LearnModule {}
