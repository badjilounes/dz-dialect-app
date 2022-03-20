import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { CapitalizeModule } from '../capitalize/capitalize.module';
import { GeneratedSentenceComponent } from './generated-sentence.component';

@NgModule({
  declarations: [GeneratedSentenceComponent],
  imports: [
    CommonModule,
    AppTranslateModule,
    CapitalizeModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  exports: [GeneratedSentenceComponent],
})
export class GeneratedSentenceModule {}
