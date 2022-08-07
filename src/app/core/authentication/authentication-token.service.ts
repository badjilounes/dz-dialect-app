import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationTokenService {
  public get token(): string | undefined {
    return localStorage.getItem('token') ?? undefined;
  }
  public set token(value: string | undefined) {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = undefined;
  }

  hasToken(): boolean {
    return !!this.token;
  }
}
