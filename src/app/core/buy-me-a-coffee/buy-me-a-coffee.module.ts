import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BuyMeACoffeeButtonComponent } from './buy-me-a-coffee-button.component';

@NgModule({
  declarations: [BuyMeACoffeeButtonComponent],
  imports: [MatIconModule, MatButtonModule],
  exports: [BuyMeACoffeeButtonComponent],
})
export class BuyMeACoffeeModule {
  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.iconRegistry.addSvgIcon(
      'buy-me-a-coffee',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/buy-me-a-coffee.svg'),
    );
  }
}
