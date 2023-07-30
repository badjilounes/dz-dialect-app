import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class SvgIconService {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {}

  registerIcons(images: string[]): void {
    images.forEach((image) => {
      this.matIconRegistry.addSvgIcon(
        image,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${image}.svg`),
      );
    });
  }
}
