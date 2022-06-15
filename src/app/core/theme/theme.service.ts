import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorage } from 'src/app/shared/technical/storage/storage.decorator';

type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static DEFAULT_THEME: ThemeMode = 'light';

  themeMode$!: BehaviorSubject<ThemeMode>;

  @LocaleStorage()
  private themeMode!: ThemeMode;

  constructor() {
    if (!this.themeMode) {
      this.themeMode = ThemeService.DEFAULT_THEME;
    }

    this.themeMode$ = new BehaviorSubject<ThemeMode>(this.themeMode);
  }

  toggleThemeMode() {
    const themeMode = this.themeMode$.getValue() === 'light' ? 'dark' : 'light';
    this.themeMode = themeMode;
    this.themeMode$.next(themeMode);
  }
}
