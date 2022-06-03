import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeMode$: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>('light');

  constructor() {}

  toggleThemeMode() {
    const mode = this.themeMode$.getValue() === 'light' ? 'dark' : 'light';
    this.themeMode$.next(mode);
  }
}
