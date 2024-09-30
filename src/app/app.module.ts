import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent], imports: [BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
