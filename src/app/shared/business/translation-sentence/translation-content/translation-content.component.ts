import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-translation-content',
  templateUrl: './translation-content.component.html',
  styleUrls: ['./translation-content.component.scss'],
})
export class TranslationContentComponent {
  @Input() content = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly clipboard: Clipboard,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
  ) {}

  copyToClipboard(): void {
    this.clipboard.copy(this.content ?? '');
    this.snackBar.open(this.translate.instant('generated-sentence.copied-to-clipboard'), 'OK', {
      duration: 3000,
    });
  }
}
