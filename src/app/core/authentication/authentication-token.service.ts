import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationTokenService {
  public get token(): string | undefined {
    return localStorage.getItem('token') ?? undefined;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  hasToken(): boolean {
    return !!this.token;
  }
}
