import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { SolveComponent } from './solve/solve.component';
import { SessionsComponent } from './sessions/sessions.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SolveComponent,
    SessionsComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
