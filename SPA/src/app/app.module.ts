import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutesModule,
    HttpClientModule
  ],
  providers: [{
    provide: 'baseUrl', useValue: 'http://localhost:5062/api', multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
