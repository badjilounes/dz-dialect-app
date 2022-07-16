import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export enum ConfirmButtonColor {
  PRIMARY = 'primary',
  WARN = 'warn',
}

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
      config.data.acceptButtonColor = config.data.acceptButtonColor || ConfirmButtonColor.PRIMARY;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    return dialogRef.afterClosed().pipe(map((response) => response === true));
  }
}
