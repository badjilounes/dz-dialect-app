import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiModule, Configuration, ConfigurationParameters } from 'src/clients/dz-dialect-api';
import { ApiModule as IdentityApiModule, Configuration as IdentityConfiguration, ConfigurationParameters as IdentityConfigurationParameters } from 'src/clients/dz-dialect-identity-api';
import { environment } from 'src/environments/environment';
import { RoutingService } from './routing/routing.service';
import { AppTranslateModule } from './translate/translate.module';
import { UnauthenticatedLayoutModule } from './unauthenticated-layout/unauthenticated-layout.module';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.apiUrl,
  };
  return new Configuration(params);
}

export function identityApiConfigFactory(): IdentityConfiguration {
  const params: IdentityConfigurationParameters = {
    basePath: environment.identityApiUrl,
  };
  return new IdentityConfiguration(params);
}

@NgModule({
  imports: [
    AppTranslateModule,
    HttpClientModule,
    ApiModule.forRoot(apiConfigFactory),
    IdentityApiModule.forRoot(identityApiConfigFactory),
    UnauthenticatedLayoutModule,
  ],
  exports: [AppTranslateModule],
})
export class CoreModule {
  constructor(translate: TranslateService, routingService: RoutingService) {
    translate.setDefaultLang('fr');
    routingService.init();
  }
}
