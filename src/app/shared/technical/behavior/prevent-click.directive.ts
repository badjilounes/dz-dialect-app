import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventClick]',
  standalone: true,
})
export class PreventClickDirective {
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.preventDefault();
  }
}
