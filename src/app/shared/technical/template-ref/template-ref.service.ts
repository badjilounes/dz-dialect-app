import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';

@Injectable()
export class TemplateRefService {
  getHeight<T>(
    viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<T>,
    context?: T,
  ): number {
    const portalHost = document.createElement('div');

    // Attacher le TemplateRef au DOM temporaire
    const portalView = viewContainerRef.createEmbeddedView(templateRef, context);
    portalView.detectChanges();
    portalHost.appendChild(portalView.rootNodes[0]);

    // Attacher le DOM temporaire au DOM réel (pour que les calculs de hauteur fonctionnent)
    window.document.body.appendChild(portalHost);

    // Mesurer la hauteur du contenu
    const contentHeight = portalHost.getBoundingClientRect().height;

    // Supprimer le DOM définitivement
    window.document.body.removeChild(portalHost);

    return contentHeight;
  }
}
