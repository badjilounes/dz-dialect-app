import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { KeywordModule } from './pages/keyword/keyword.module';
import { RandomModule } from './pages/random/random.module';
import { TestModule } from './pages/test/test.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    KeywordModule,
    RandomModule,
    TestModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
