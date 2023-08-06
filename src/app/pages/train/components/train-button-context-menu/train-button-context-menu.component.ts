import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { ContextMenuAnimation } from './train-button-context-menu-animation';
import { BehaviorSubject } from 'rxjs';
import { OverlayModule, OverlayRef } from '@angular/cdk/overlay';

export type TrainButtonContextMenuAction = {
  text: string;
  color?: string;
  disabled: boolean;
  link: string;
};

export type TrainButtonContextMenu = {
  title: string;
  description: string;
  background?: string;
  color?: string;
  offsetX: number;
  appearance: 'locked' | 'unlocked';
  actions: TrainButtonContextMenuAction[];
};

export const TRAIN_BUTTON_CONTEXT_MENU_DATA = new InjectionToken<TrainButtonContextMenu>(
  'TRAIN_BUTTON_CONTEXT_MENU_DATA',
);

export const TRAIN_BUTTON_CONTEXT_MENU_OVERLAY_REF = new InjectionToken<OverlayRef>(
  'TRAIN_BUTTON_CONTEXT_MENU_OVERLAY_REF',
);

@Component({
  selector: 'app-train-button-context-menu',
  templateUrl: './train-button-context-menu.component.html',
  styleUrls: ['./train-button-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatLegacyButtonModule, RouterModule, OverlayModule],
  animations: [ContextMenuAnimation],
})
export class TrainButtonContextMenuComponent {
  get isOpened(): boolean {
    return this.menuOpened$.value;
  }

  menuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(TRAIN_BUTTON_CONTEXT_MENU_DATA) public data: TrainButtonContextMenu,
    @Inject(TRAIN_BUTTON_CONTEXT_MENU_OVERLAY_REF) private readonly _overlayRef: OverlayRef,
    public element: ElementRef<HTMLElement>,
  ) {}

  close(): void {
    this.menuOpened$.next(false);
    this._overlayRef.dispose();
  }

  open(): void {
    this.menuOpened$.next(true);
  }
}
