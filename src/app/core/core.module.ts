import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IdentityClientModule } from 'src/app/core/clients/identity-client.module';
import { SentenceClientModule } from 'src/app/core/clients/sentence-client.module';
import { TrainingClientModule } from 'src/app/core/clients/training-client.module';
import { HTTP_BEARER_TOKEN_INTERCEPTOR_PROVIDER } from './authentication/bearer-token.interceptor';
import { PageLayoutDirective } from './layout/directives/is-page-layout.directive';
import { RoutingService } from './routing/routing.service';
import { AppTranslateModule } from './translate/translate.module';
import { PwaModule } from './pwa/pwa.module';

registerLocaleData(localeFr);

@NgModule({
  imports: [
    AppTranslateModule,
    HttpClientModule,
    SentenceClientModule,
    IdentityClientModule,
    TrainingClientModule,
    PageLayoutDirective,
    PwaModule,
  ],
  providers: [HTTP_BEARER_TOKEN_INTERCEPTOR_PROVIDER, { provide: LOCALE_ID, useValue: 'fr' }],
  exports: [AppTranslateModule],
})
export class CoreModule {
  constructor(translate: TranslateService, routingService: RoutingService) {
    translate.setDefaultLang('fr');
    routingService.init();
  }
}
