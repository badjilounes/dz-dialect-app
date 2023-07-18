import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../../../shared/design-system/card/card.component';
import { FullLineCardButtonComponent } from '../../../../shared/design-system/full-line-card-button/full-line-card-button.component';
import { MatLegacySlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { ThemeService } from '../../../../core/theme/theme.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { PreventClickDirective } from '../../../../shared/technical/behavior/prevent-click.directive';

@UntilDestroy()
@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    FullLineCardButtonComponent,
    CardComponent,
    MatLegacySlideToggleModule,
    PreventClickDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent {
  isDarkThemeControl = new FormControl(this.theme.themeMode$.value === 'dark');

  constructor(private readonly theme: ThemeService) {
    this.theme.themeMode$
      .pipe(
        tap((themeMode) => this.isDarkThemeControl.setValue(themeMode === 'dark')),
        untilDestroyed(this),
      )
      .subscribe();
  }

  toggleTheme(): void {
    this.theme.toggleThemeMode();
  }
}
