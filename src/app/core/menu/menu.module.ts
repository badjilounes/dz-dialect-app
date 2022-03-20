import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BuyMeACoffeeModule } from '../buy-me-a-coffee/buy-me-a-coffee.module';
import { AppTranslateModule } from '../translate/translate.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    BuyMeACoffeeModule,
    AppTranslateModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
