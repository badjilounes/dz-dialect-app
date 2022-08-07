import { Injectable } from '@angular/core';
import { LocaleStorage } from 'src/app/shared/technical/storage/storage.decorator';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @LocaleStorage() token?: string;

  setAsAuthenticated(token: string) {
    this.token = token;
  }

  setAsUnauthenticated() {
    this.token = undefined;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
