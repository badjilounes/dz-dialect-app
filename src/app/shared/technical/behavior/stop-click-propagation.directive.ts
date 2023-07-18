import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopClickPropagation]',
  standalone: true,
})
export class StopClickPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.stopPropagation();
  }
}
