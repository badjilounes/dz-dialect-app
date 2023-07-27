import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, merge, tap } from 'rxjs';

@UntilDestroy()
@Directive({
  selector: '[appAddClassOnClick]',
  standalone: true,
})
export class AddClassOnClickDirective implements OnInit {
  @Input() classToAddOnClick = '';

  constructor(private readonly element: ElementRef<HTMLButtonElement>) {}

  ngOnInit(): void {
    merge(
      fromEvent(this.element.nativeElement, 'mousedown'),
      fromEvent(this.element.nativeElement, 'touchstart'),
    )
      .pipe(
        tap(() => this.element.nativeElement.classList.add(this.classToAddOnClick)),
        untilDestroyed(this),
      )
      .subscribe();

    merge(
      fromEvent(this.element.nativeElement, 'mouseup'),
      fromEvent(this.element.nativeElement, 'mouseout'),
      fromEvent(this.element.nativeElement, 'touchend'),
      fromEvent(this.element.nativeElement, 'touchcancel'),
    )
      .pipe(
        tap(() => this.element.nativeElement.classList.remove(this.classToAddOnClick)),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
