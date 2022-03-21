import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppTranslateModule } from 'src/app/core/translate/translate.module';
import { CapitalizeModule } from '../../technical/capitalize/capitalize.module';
import {GeneratedKeywordComponent} from "./generated-keyword.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [GeneratedKeywordComponent],
  imports: [
    CommonModule,
    AppTranslateModule,
    CapitalizeModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    FormsModule,
  ],
  exports: [GeneratedKeywordComponent],
})
export class GeneratedKeywordModule {}
