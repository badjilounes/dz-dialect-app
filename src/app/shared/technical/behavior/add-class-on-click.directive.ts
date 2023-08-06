import { Directive, ElementRef, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, fromEvent, merge, repeat, take, tap } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appIsButtonPressed]',
  standalone: true,
  exportAs: 'appIsButtonPressed',
})
export class IsButtonPressedDirective implements OnInit {
  isPressed$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly element: ElementRef<HTMLButtonElement>) {}

  ngOnInit(): void {
    const released$ = merge(
      fromEvent(this.element.nativeElement, 'click', { passive: true }),
      fromEvent(this.element.nativeElement, 'mouseup', { passive: true }),
      fromEvent(this.element.nativeElement, 'mouseup', { passive: true }),
      fromEvent(this.element.nativeElement, 'mouseout', { passive: true }),
      fromEvent(this.element.nativeElement, 'touchend', { passive: true }),
      fromEvent(this.element.nativeElement, 'touchcancel', { passive: true }),
    );

    const pressed$ = merge(
      fromEvent(this.element.nativeElement, 'mousedown', { passive: true }),
      fromEvent(this.element.nativeElement, 'touchstart', { passive: true }),
    );

    pressed$
      .pipe(
        tap(() => this.isPressed$.next(true)),
        take(1),
        repeat({ delay: () => released$ }),
        untilDestroyed(this),
      )
      .subscribe();

    released$
      .pipe(
        tap(() => this.isPressed$.next(false)),
        take(1),
        repeat({ delay: () => pressed$ }),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
