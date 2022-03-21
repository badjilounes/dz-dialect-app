import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { CapitalizeModule } from '../../technical/capitalize/capitalize.module';
import { GeneratedSentenceComponent } from './generated-sentence.component';
import {MatButtonModule} from "@angular/material/button";
import {ClipboardModule} from "@angular/cdk/clipboard";

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
    MatButtonModule,
    ClipboardModule,
  ],
  exports: [GeneratedSentenceComponent],
})
export class GeneratedSentenceModule {}
