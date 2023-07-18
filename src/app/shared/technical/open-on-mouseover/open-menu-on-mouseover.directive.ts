import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MatLegacyMenu, MatLegacyMenuTrigger } from '@angular/material/legacy-menu';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, fromEvent, map, tap } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[openMenuOnMouseover]',
  standalone: true,
})
export class OpenMenuOnMouseoverDirective implements OnInit, AfterViewInit {
  @Input() trigger!: MatLegacyMenuTrigger;
  @Input() menu!: MatLegacyMenu;

  private timedOutCloser: any;

  constructor(private readonly elementRef: ElementRef<MatLegacyMenuTrigger>) {}

  ngOnInit(): void {
    // Disable backdrop
    this.menu.hasBackdrop = false;
  }

  ngAfterViewInit(): void {
    if (this.elementRef.nativeElement) {
      this.registerMouseListeners(this.elementRef.nativeElement);

      this.trigger.menuOpened
        .pipe(
          map(() => document.getElementById(this.menu.panelId)),
          filter(Boolean),
          tap((menu) => this.registerMouseListeners(menu)),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }

  private registerMouseListeners(element: any): void {
    fromEvent(element, 'mouseenter').pipe(untilDestroyed(this)).subscribe(this.openMenu.bind(this));

    fromEvent(element, 'mouseleave')
      .pipe(untilDestroyed(this))
      .subscribe(this.closeMenu.bind(this));
  }

  private openMenu(): void {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }

    if (!this.trigger.menuOpen) {
      this.trigger.openMenu();
    }
  }

  private closeMenu(): void {
    this.timedOutCloser = setTimeout(() => {
      this.trigger.closeMenu();
    }, 50);
  }
}
