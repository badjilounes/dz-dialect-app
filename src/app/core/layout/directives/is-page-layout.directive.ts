import { Directive, HostBinding } from '@angular/core';
import { AppStore } from '../../../app.store';

@Directive({
  selector: '[is-page-layout]',
  standalone: true,
})
export class IsPageLayoutDirective {
  @HostBinding('class.small-screen-layout') isSmallScreen = false;

  constructor(private readonly appStore: AppStore) {
    console.log('here');
    this.appStore.isSmallScreen$.subscribe((isSmallScreen) => {
      this.isSmallScreen = isSmallScreen;
    });
  }
}
