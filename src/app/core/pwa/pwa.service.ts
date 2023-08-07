import { Injectable } from '@angular/core';
import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { filter, forkJoin } from 'rxjs';
@Injectable()
export class PwaService {
  constructor(
    private readonly _swUpdate: SwUpdate,
    private readonly _snackBar: MatLegacySnackBar,
    private readonly _translate: TranslateService,
  ) {
    this._translate.setDefaultLang('fr');
    this._translate.use('fr');
  }

  init(): void {
    window.addEventListener('beforeinstallprompt', (event) => this._showInstallPwa(event));

    this._swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => this._showAskToUpdate());
  }

  private _showAskToUpdate(): void {
    forkJoin({
      message: this._translate.get('pwa.reload'),
      action: this._translate.get('update'),
    }).subscribe(({ message, action }) => {
      const snackRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open(message, action);
      snackRef.onAction().subscribe(() => window.location.reload());
    });
  }

  private _showInstallPwa(event: any): void {
    forkJoin({
      message: this._translate.get('pwa.install'),
      action: this._translate.get('install'),
    }).subscribe(({ message, action }) => {
      const snackRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open(message, action);
      snackRef.onAction().subscribe(() => event.prompt());
    });
  }
}
