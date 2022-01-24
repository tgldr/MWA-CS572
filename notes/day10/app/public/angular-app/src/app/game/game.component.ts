import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  gameId!: string;
  game!: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GamesDataService
  ) {
    this.game = new Game('', 0, '');
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameService
      .getGame(this.gameId)
      .then((response) => {
        this.game = response;
      })
      .catch((error) => console.log('Error getting game:', error));
  }
}
