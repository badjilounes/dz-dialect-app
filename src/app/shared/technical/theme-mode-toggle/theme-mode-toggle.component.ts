import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-theme-mode-toggle',
  templateUrl: './theme-mode-toggle.component.html',
  styleUrls: ['./theme-mode-toggle.component.scss'],
})
export class ThemeModeToggleComponent {
  @Input() icon = true;

  isDarkMode$ = this.theme.themeMode$.pipe(map((themeMode) => themeMode === 'dark'));

  constructor(private readonly theme: ThemeService) {}

  toggleThemeMode(): void {
    this.theme.toggleThemeMode();
  }
}
