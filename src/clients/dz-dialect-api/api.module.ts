import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AdjectiveControllerHttpService } from './api/adjective-controller.service';
import { AdverbControllerHttpService } from './api/adverb-controller.service';
import { DzDialectApiSpringApplicationHttpService } from './api/dz-dialect-api-spring-application.service';
import { NounControllerHttpService } from './api/noun-controller.service';
import { PronounsControllerHttpService } from './api/pronouns-controller.service';
import { QuestionsControllerHttpService } from './api/questions-controller.service';
import { SentenceControllerHttpService } from './api/sentence-controller.service';
import { VerbControllerHttpService } from './api/verb-controller.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
