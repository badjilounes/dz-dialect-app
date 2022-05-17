import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { GeneratedKeywordModule } from '../../shared/business/generated-keyword/generated-keyword.module';
import { KeywordComponent } from './keyword.component';

@NgModule({
  declarations: [KeywordComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    GeneratedKeywordModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CapitalizeModule,
  ],
})
export class KeywordModule {}
