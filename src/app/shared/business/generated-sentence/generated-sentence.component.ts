import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ResponseSentences } from 'src/api';

@Component({
  selector: 'app-generated-sentence',
  templateUrl: './generated-sentence.component.html',
  styleUrls: ['./generated-sentence.component.scss'],
})
export class GeneratedSentenceComponent {
  @Input() sentence?: ResponseSentences | null;
  @Input() handset!: boolean;

  sourceLanguage = { value: 'fr-FR', label: 'generated-sentence.source-language.fr-fr' };
  targetLanguage = { value: 'dz-AL', label: 'generated-sentence.source-language.dz-al' };

  constructor(
    private readonly clipboard: Clipboard,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
  ) {}

  copyToClipboard(): void {
    this.clipboard.copy(this.sentence?.dz_value ?? '');
    this.snackBar.open(this.translate.instant('generated-sentence.copied-to-clipboard'), 'OK', {
      duration: 3000,
    });
  }
}
