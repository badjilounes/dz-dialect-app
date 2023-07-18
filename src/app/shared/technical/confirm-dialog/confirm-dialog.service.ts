import { Injectable } from '@angular/core';
import {
  MatLegacyDialog as MatDialog,
  MatLegacyDialogConfig as MatDialogConfig,
} from '@angular/material/legacy-dialog';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export type ConfirmButtonColor = 'primary' | 'accent' | 'warn';

export type ConfirmData = {
  title: string;
  content: string;
  cancelLabel: string;
  acceptLabel: string;
  acceptButtonColor?: ConfirmButtonColor;
};

@Injectable()
export class ConfirmDialogService {
  constructor(private readonly dialog: MatDialog) {}

  confirm(config: MatDialogConfig<ConfirmData>): Observable<boolean> {
    config.autoFocus = config.autoFocus ?? false;
    config.width = config.width ?? '600px';

    if (config.data) {
      config.data.acceptButtonColor = config.data.acceptButtonColor || 'primary';
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    return dialogRef.afterClosed().pipe(map((response) => response === true));
  }
}
