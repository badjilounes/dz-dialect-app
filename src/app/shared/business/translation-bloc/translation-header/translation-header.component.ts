import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';

export type Language = { value: 'dz' | 'fr' | 'dz_ar'; label: string };

@Component({
  selector: 'app-translation-header',
  templateUrl: './translation-header.component.html',
  styleUrls: ['./translation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
})
export class TranslationHeaderComponent {
  @Input() sourceLanguage!: Language;
  @Input() targetLanguage!: Language;

  @Output() languagesSwapped: EventEmitter<void> = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  swapLanguages(): void {
    this.languagesSwapped.emit();
  }

  compareWithValue = (a: Language | null, b: Language | null) => {
    const aValue = a && a.value;
    const bValue = b && b.value;
    return aValue === bValue;
  };
}
