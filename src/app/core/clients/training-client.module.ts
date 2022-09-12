import { NgModule } from '@angular/core';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from 'src/clients/dz-dialect-training-api';
import { environment } from 'src/environments/environment';

function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.trainingApiUrl,
  };
  return new Configuration(params);
}

@NgModule({
  imports: [ApiModule.forRoot(apiConfigFactory)],
  exports: [ApiModule],
})
export class TrainingClientModule {}
