import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkMode$ = this.themeService.themeMode$.pipe(map((mode) => mode === 'dark'));

  title = 'DZDialect';

  constructor(private readonly themeService: ThemeService) {}
}
