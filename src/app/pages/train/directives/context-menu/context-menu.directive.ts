import { Directive, ElementRef, TemplateRef } from '@angular/core';
import { TrainButtonData } from '../../components/train-button/train-button.component';

@Directive({
  selector: 'ng-template[contextMenu]',
  standalone: true,
})
export class ContextMenuDirective {
  constructor(public element: ElementRef, public template: TemplateRef<TrainButtonData>) {}
}
