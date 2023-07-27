import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationTokenService {
  public get token(): string | undefined {
    return localStorage.getItem('token') ?? undefined;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  hasToken(): boolean {
    return !!this.token;
  }

  get guestId(): string {
    const guestId = localStorage.getItem('guestId') ?? uuidv4();
    localStorage.setItem('guestId', guestId);
    return guestId;
  }
}
