import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationSentenceModule } from 'src/app/shared/business/translation-bloc/translation-bloc.module';
import { CapitalizeModule } from 'src/app/shared/technical/capitalize/capitalize.module';
import { KeywordComponent } from './keyword.page';

@NgModule({
  declarations: [KeywordComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CapitalizeModule,
    TranslationSentenceModule,
    MatProgressSpinnerModule,
    LetModule,
  ],
  exports: [KeywordComponent],
})
export class KeywordModule {}
