import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationTokenService } from './authentication-token.service';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationTokenService: AuthenticationTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationTokenService.hasToken()) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authenticationTokenService.token}` },
      });
    }

    return next.handle(request);
  }
}

export const HTTP_BEARER_TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: BearerTokenInterceptor,
  multi: true,
};
