import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ResponseSentences } from 'src/api';
import { Language } from 'src/app/shared/business/translation-sentence/translation-header/translation-header.component';

@Component({
  selector: 'app-generated-sentence',
  templateUrl: './generated-sentence.component.html',
  styleUrls: ['./generated-sentence.component.scss'],
})
export class GeneratedSentenceComponent {
  @Input() sentence?: ResponseSentences | null;

  private _sourceLanguage: Language = {
    value: 'dz_value',
    label: 'generated-sentence.source-language.dz_value',
  };
  get sourceLanguage(): Language {
    return this._sourceLanguage;
  }

  private _targetLanguage: Language = {
    value: 'fr_value',
    label: 'generated-sentence.source-language.fr_value',
  };
  get targetLanguage(): Language {
    return this._targetLanguage;
  }

  get sourceContent(): string {
    return this.sentence?.[this.sourceLanguage.value] || '';
  }

  get targetContent(): string {
    return this.sentence?.[this.targetLanguage.value] || '';
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(private readonly breakpointObserver: BreakpointObserver) {}

  swapLanguages(): void {
    [this._sourceLanguage, this._targetLanguage] = [this.targetLanguage, this.sourceLanguage];
  }
}
