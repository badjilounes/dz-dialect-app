import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

type BuyMeACoffeeButtonPosition = {
  bottom: number;
};

@Injectable({
  providedIn: 'root',
})
export class BuyMeACoffeeService {
  private readonly identifier: string = 'bmc-wbtn';
  private readonly buttonPosition: BuyMeACoffeeButtonPosition = {
    bottom: 18,
  };

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  updatePosition({ bottom }: BuyMeACoffeeButtonPosition): void {
    const button = this.document.getElementById(this.identifier);

    if (button) {
      button.style.bottom = `${bottom}px`;
    }
  }

  resetPosition(): void {
    this.updatePosition(this.buttonPosition);
  }
}
