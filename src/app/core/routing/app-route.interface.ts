import { Route } from '@angular/router';
import { AppRouteData } from './app-route-data.interface';

export interface AppRoute extends Route {
  data?: AppRouteData;
}
