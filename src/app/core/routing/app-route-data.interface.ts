import { Data } from '@angular/router';

export interface AppRouteData extends Data {
  order?: number;
  classSuffix?: string;
  scope?: string;
  menu?: boolean;
  title?: string;
}
