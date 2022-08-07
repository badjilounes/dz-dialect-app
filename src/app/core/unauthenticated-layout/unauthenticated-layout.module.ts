import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModeToggleModule } from 'src/app/shared/technical/theme-mode-toggle/theme-mode-toggle.module';
import { UnauthenticatedLayoutComponent } from './unauthenticated-layout.component';

@NgModule({
  declarations: [UnauthenticatedLayoutComponent],
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    LetModule,
    ThemeModeToggleModule,
  ],
  exports: [UnauthenticatedLayoutComponent],
})
export class UnauthenticatedLayoutModule {}
