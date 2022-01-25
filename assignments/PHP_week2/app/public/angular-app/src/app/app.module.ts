import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { SolveComponent } from './solve/solve.component';
import { SessionsComponent } from './sessions/sessions.component';
import { FindComponent } from './find/find.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TimerPipe } from './timer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SolveComponent,
    SessionsComponent,
    FindComponent,
    NavigationComponent,
    TimerPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SessionsComponent,
      },
      {
        path: 'find',
        component: FindComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
