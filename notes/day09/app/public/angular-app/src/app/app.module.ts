import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AgeOfEmpiresComponent } from './age-of-empires/age-of-empires.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    GamesComponent,
    ErrorPageComponent,
    AgeOfEmpiresComponent,
    SkillDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'dnd',
        component: AgeOfEmpiresComponent,
      },
      {
        path: 'skill/:id',
        component: SkillDetailComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
