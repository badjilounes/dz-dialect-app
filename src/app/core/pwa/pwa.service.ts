import { Injectable } from '@angular/core';
import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
@Injectable()
export class PwaService {
  constructor(
    private readonly swUpdate: SwUpdate,
    private readonly snackBar: MatLegacySnackBar,
    private readonly translateSrv: TranslateService,
  ) {}

  init(): void {
    window.addEventListener('beforeinstallprompt', (event) => this._showInstallPwa(event));

    this._showInstallPromptForIos();

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => this._showAskToUpdate());
  }

  private _showAskToUpdate(): void {
    const snackRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
      this.translateSrv.instant('pwa.reload'),
      this.translateSrv.instant('install'),
    );

    snackRef.onAction().subscribe(() => window.location.reload());
  }

  private _showInstallPwa(event: any): void {
    let snackRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
      this.translateSrv.instant('pwa.install'),
      this.translateSrv.instant('install'),
    );
    snackRef.onAction().subscribe(() => event.prompt());
  }

  private _showInstallPromptForIos(): void {
    // Checks if should display install popup notification:
    if (this._isIOS() && !this._isInStandaloneMode()) {
      this.snackBar.open(this.translateSrv.instant('pwa.install-ios'), 'OK');
    }
  }

  private _isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  private _isInStandaloneMode(): boolean {
    return !!('standalone' in window.navigator) && !!window.navigator['standalone'];
  }
}
