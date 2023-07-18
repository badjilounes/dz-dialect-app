import { Directive, HostBinding } from '@angular/core';
import { AppStore } from '../../../app.store';

@Directive({
  selector: '[page-layout]',
  standalone: true,
})
export class PageLayoutDirective {
  @HostBinding('class') get classList(): string {
    return ['page-screen-layout', this.isSmallScreen ? 'small' : 'large'].join(' ');
  }

  private isSmallScreen = false;

  constructor(private readonly appStore: AppStore) {
    this.appStore.isSmallScreen$.subscribe((isSmallScreen) => {
      this.isSmallScreen = isSmallScreen;
    });
  }
}
