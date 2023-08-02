import { Injectable, RendererFactory2, TemplateRef, ViewContainerRef } from '@angular/core';

@Injectable()
export class TemplateRefService {
  constructor(private readonly _rendererFactory: RendererFactory2) {}

  getHeight(viewContainerRef: ViewContainerRef, templateRef: TemplateRef<unknown>): number {
    const renderer = this._rendererFactory.createRenderer(null, null);

    const portalHost = document.createElement('div');

    // Attacher le TemplateRef au DOM temporaire
    const portalView = viewContainerRef.createEmbeddedView(templateRef);
    renderer.appendChild(portalHost, portalView.rootNodes[0]);

    // Attacher le DOM temporaire au DOM réel (pour que les calculs de hauteur fonctionnent)
    renderer.appendChild(window.document.body, portalHost);

    // Mesurer la hauteur du contenu
    const contentHeight = portalHost.getBoundingClientRect().height;

    // Supprimer le DOM définitivement
    renderer.removeChild(window.document.body, portalHost);

    return contentHeight;
  }
}
