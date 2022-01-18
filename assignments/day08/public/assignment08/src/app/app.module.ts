import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { MeanGameComponent } from './mean-game/mean-game.component';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    MeanGameComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'students', component: StudentsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'mean-games', component: MeanGameComponent },
      { path: '**', component: WelcomeComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
