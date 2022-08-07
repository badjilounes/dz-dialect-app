import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorModule } from 'src/app/shared/technical/behavior/behavior.module';
import { ThemeModeToggleModule } from 'src/app/shared/technical/theme-mode-toggle/theme-mode-toggle.module';
import { TrainingToolbarBottomComponent } from './components/training-toolbar-bottom/training-toolbar-bottom.component';
import { TrainingToolbarTopComponent } from './components/training-toolbar-top/training-toolbar-top.component';
import { TrainingLayoutComponent } from './training-layout.component';

@NgModule({
  declarations: [
    TrainingLayoutComponent,
    TrainingToolbarTopComponent,
    TrainingToolbarBottomComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    LetModule,
    TranslateModule,
    ThemeModeToggleModule,
    BehaviorModule,
  ],
  exports: [TrainingLayoutComponent],
})
export class TrainingLayoutModule {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'train',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/train.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'train-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/train-active.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'learn',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/learn.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'learn-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/learn-active.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'sign-in',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/sign-in.svg'),
    );
    this.matIconRegistry.addSvgIcon(
      'sign-in-active',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/svg/sign-in-active.svg'),
    );
  }
}
