import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiModule, Configuration, ConfigurationParameters } from 'src/clients/dz-dialect-api';
import { environment } from 'src/environments/environment';
import { MenuModule } from './menu/menu.module';
import { RoutingService } from './routing/routing.service';
import { AppTranslateModule } from './translate/translate.module';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.apiUrl,
  };
  return new Configuration(params);
}

@NgModule({
  imports: [AppTranslateModule, HttpClientModule, ApiModule.forRoot(apiConfigFactory), MenuModule],
  exports: [AppTranslateModule],
})
export class CoreModule {
  constructor(translate: TranslateService, routingService: RoutingService) {
    translate.setDefaultLang('fr');
    routingService.init();
  }
}
