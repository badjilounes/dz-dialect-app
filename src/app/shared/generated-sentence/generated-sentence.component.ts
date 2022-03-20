import { Component, Input } from '@angular/core';
import { ResponseSentences } from 'src/api';

@Component({
  selector: 'app-generated-sentence',
  templateUrl: './generated-sentence.component.html',
  styleUrls: ['./generated-sentence.component.scss'],
})
export class GeneratedSentenceComponent {
  @Input() sentence!: ResponseSentences;
  @Input() handset!: boolean;

  sourceLanguage = { value: 'fr-FR', label: 'generated-sentence.source-language.fr-fr' };
  targetLanguage = { value: 'dz-AL', label: 'generated-sentence.source-language.dz-al' };
}
