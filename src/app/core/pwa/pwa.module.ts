import { NgModule } from '@angular/core';
import { PwaService } from './pwa.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacySnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
  imports: [TranslateModule, MatLegacySnackBarModule],
  providers: [PwaService],
})
export class PwaModule {
  constructor(private readonly _pwa: PwaService) {
    this._pwa.init();
  }
}
