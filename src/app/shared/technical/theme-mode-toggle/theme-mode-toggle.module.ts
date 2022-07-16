import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LetModule } from '@ngrx/component';
import { ThemeModeToggleComponent } from './theme-mode-toggle.component';

@NgModule({
  declarations: [ThemeModeToggleComponent],
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, LetModule],
  exports: [ThemeModeToggleComponent],
})
export class ThemeModeToggleModule {}