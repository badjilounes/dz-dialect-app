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

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      this.authenticationTokenService.token
        ? req.clone({
            setHeaders: { Authorization: `Bearer ${this.authenticationTokenService.token}` },
          })
        : req,
    );
  }
}

export const HTTP_BEARER_TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: BearerTokenInterceptor,
  multi: true,
};
