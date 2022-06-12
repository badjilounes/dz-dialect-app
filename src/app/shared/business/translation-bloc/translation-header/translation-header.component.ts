import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

export type Language = { value: 'dz' | 'fr' | 'dz_ar'; label: string };

@Component({
  selector: 'app-translation-header',
  templateUrl: './translation-header.component.html',
  styleUrls: ['./translation-header.component.scss'],
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
