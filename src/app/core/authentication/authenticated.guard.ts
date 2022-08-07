import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authenticationService: AuthenticationService) {}

  canActivate(): boolean {
      const authenticated = this.authenticationService.isAuthenticated();

      if (!authenticated) {
        this.router.navigate(['/sign-in']);
      }

      return authenticated;
  }

}
