import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AgeOfEmpiresComponent } from './age-of-empires/age-of-empires.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { GameComponent } from './game/game.component';
import { OrderPipe } from './order.pipe';
import { VowelRemoverPipe } from './vowel-remover.pipe';

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
    OrderPipe,
    VowelRemoverPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
        path: 'game/:gameId',
        component: GameComponent,
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
