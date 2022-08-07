import { Injectable } from '@angular/core';
import { filter, of, shareReplay, switchMap } from 'rxjs';
import { UsersHttpService } from 'src/clients/dz-dialect-identity-api';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$ = of(this.authenticationService.isAuthenticated()).pipe(
    filter((authenticated) => authenticated),
    switchMap(() => this.usersHttpService.getConnectedUser()),
    shareReplay()
  );;

  constructor(private readonly usersHttpService: UsersHttpService, private readonly authenticationService: AuthenticationService) { }
}
