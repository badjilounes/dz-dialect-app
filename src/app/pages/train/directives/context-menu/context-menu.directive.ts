import { Directive, ElementRef, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[contextMenu]',
  standalone: true,
})
export class ContextMenuDirective {
  constructor(public element: ElementRef, public template: TemplateRef<HTMLElement>) {}
}
