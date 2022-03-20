import {NgModule} from '@angular/core';
import {KeywordComponent} from './keyword.component';
import {MatCardModule} from "@angular/material/card";
import {GeneratedSentenceModule} from "../../shared/business/generated-sentence/generated-sentence.module";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {GeneratedKeywordModule} from "../../shared/business/generated-keyword/generated-keyword.module";

@NgModule({
  declarations: [KeywordComponent],
  imports: [
    MatCardModule,
    CommonModule,
    TranslateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    GeneratedKeywordModule
  ]
})
export class KeywordModule {}
