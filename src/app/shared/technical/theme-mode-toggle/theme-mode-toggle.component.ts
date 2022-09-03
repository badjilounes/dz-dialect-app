import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ThemeService } from 'src/app/core/theme/theme.service';

@Component({
  selector: 'app-theme-mode-toggle',
  templateUrl: './theme-mode-toggle.component.html',
  styleUrls: ['./theme-mode-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatSlideToggleModule, LetModule],
})
export class ThemeModeToggleComponent {
  @Input() icon = true;

  isDarkMode$ = this.theme.themeMode$.pipe(map((themeMode) => themeMode === 'dark'));

  constructor(private readonly theme: ThemeService) {}

  toggleThemeMode(): void {
    this.theme.toggleThemeMode();
  }
}
