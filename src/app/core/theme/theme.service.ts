import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorage } from 'src/app/shared/technical/storage/storage.decorator';

type ThemeMode = 'light' | 'dark';

enum StatusBarColor {
  GREEN = '#c5e1a5',
  LIGHT = '#ffffff',
  DARK = '#424242',
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static DEFAULT_THEME: ThemeMode = 'light';

  themeMode$!: BehaviorSubject<ThemeMode>;

  @LocaleStorage()
  private _themedStatusBar!: boolean;

  public get themedStatusBar() {
    return this._themedStatusBar;
  }
  public set themedStatusBar(value) {
    this._themedStatusBar = value;
    this.setStatusBarColor();
  }

  @LocaleStorage()
  private themeMode!: ThemeMode;

  constructor() {
    if (!this.themeMode) {
      this.themeMode = ThemeService.DEFAULT_THEME;
    }

    if (this.themedStatusBar === undefined || this.themedStatusBar === null) {
      this.themedStatusBar = false;
    }

    this.themeMode$ = new BehaviorSubject<ThemeMode>(this.themeMode);
    this.setThemeMode();
    this.setStatusBarColor();
  }

  toggleThemeMode() {
    const themeMode = this.themeMode$.getValue() === 'light' ? 'dark' : 'light';
    this.themeMode = themeMode;
    this.themeMode$.next(themeMode);
    this.setThemeMode();
    this.setStatusBarColor();
  }

  setThemeMode() {
    document.body.classList.toggle('darkMode', this.themeMode === 'dark');
  }

  setStatusBarColor() {
    let color = StatusBarColor.GREEN;

    if (this.themedStatusBar) {
      color = this.themeMode$.getValue() === 'light' ? StatusBarColor.LIGHT : StatusBarColor.DARK;
    }

    document.getElementById('meta-theme-color')!.setAttribute('content', color);
  }
}
