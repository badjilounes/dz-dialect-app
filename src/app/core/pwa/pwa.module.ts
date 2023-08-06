import { NgModule } from '@angular/core';
import { PwaService } from './pwa.service';
import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';
import { AppTranslateModule } from '../translate/translate.module';

@NgModule({
  imports: [AppTranslateModule, MatLegacySnackBarModule],
  providers: [PwaService],
})
export class PwaModule {
  constructor(private readonly _pwa: PwaService) {
    this._pwa.init();
  }
}
