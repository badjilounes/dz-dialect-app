import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { GeneratedKeywordModule } from '../../shared/business/generated-keyword/generated-keyword.module';
import { KeywordComponent } from './keyword.component';

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
    GeneratedKeywordModule,
  ],
})
export class KeywordModule {}
