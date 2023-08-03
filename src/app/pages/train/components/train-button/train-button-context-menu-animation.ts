import { trigger, state, style, transition, animate } from '@angular/animations';

export const CONTEXT_MENU_ANIMATION_DURATION = 250;

const animation = `${CONTEXT_MENU_ANIMATION_DURATION}ms cubic-bezier(0.4,0.0,0.2,1)`;
export const ContextMenuAnimation = [
  trigger('openClose', [
    state('closed', style({ transform: 'scale(0)' })),
    state('open', style({ transform: 'scale(1)' })),
    transition('open => closed', [animate(animation)]),
    transition('closed => open', [animate(animation)]),
  ]),
];
