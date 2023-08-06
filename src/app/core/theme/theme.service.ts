import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleStorage } from 'src/app/shared/technical/storage/storage.decorator';

type ThemeMode = 'light' | 'dark';

export enum StatusBarColor {
  OVERVIEW = '#025acc',
  LIGHTGREEN = '#bdedce',
  LIGHT = '#ffffff',
  DARK = '#131f24',
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private static DEFAULT_THEME: ThemeMode = 'light';

  themeMode$!: BehaviorSubject<ThemeMode>;

  @LocaleStorage()
  private _themedStatusBar!: boolean;

  public get themedStatusBar(): boolean {
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

  toggleThemeMode(): void {
    const themeMode = this.themeMode$.getValue() === 'light' ? 'dark' : 'light';
    this.themeMode = themeMode;
    this.themeMode$.next(themeMode);
    this.setThemeMode();
    this.setStatusBarColor();
  }

  setThemeMode(): void {
    document.body.classList.toggle('darkMode', this.themeMode === 'dark');
  }

  setStatusBarColor(): void {
    let color = StatusBarColor.OVERVIEW;

    if (this.themedStatusBar) {
      color = this.themeMode$.getValue() === 'light' ? StatusBarColor.LIGHT : StatusBarColor.DARK;
    }

    this.updateStatusBarColor(color);
  }

  updateStatusBarColor(color: string): void {
    document.getElementById('meta-theme-color')!.setAttribute('content', color);
  }
}
