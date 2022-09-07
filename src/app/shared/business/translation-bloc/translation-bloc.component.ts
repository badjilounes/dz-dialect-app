import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { LetModule } from '@ngrx/component';
import { map, Observable, shareReplay } from 'rxjs';
import { SentenceDTO } from 'src/clients/dz-dialect-api';
import { CardComponent } from '../../design-system/card/card.component';
import { TranslationContentComponent } from './translation-content/translation-content.component';
import {
  Language,
  TranslationHeaderComponent,
} from './translation-header/translation-header.component';

@Component({
  selector: 'app-translation-bloc',
  templateUrl: './translation-bloc.component.html',
  styleUrls: ['./translation-bloc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    TranslationHeaderComponent,
    TranslationContentComponent,
    MatDividerModule,
    LetModule,
  ],
})
export class TranslationBlocComponent {
  @Input() sentence?: SentenceDTO | null;

  private _sourceLanguage: Language = {
    value: 'dz',
    label: 'generated-sentence.source-language.dz_value',
  };
  get sourceLanguage(): Language {
    return this._sourceLanguage;
  }

  private _targetLanguage: Language = {
    value: 'fr',
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
