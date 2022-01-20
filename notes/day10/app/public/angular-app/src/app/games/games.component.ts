import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

export class Game {
  #_id!: string;
  #title!: String;
  #year!: String;
  #rate!: String;
  #minPlayers!: String;
  #maxPlayers!: String;
  #minAge!: String;
  #price!: Number;

  get _id() {
    return this.#_id;
  }
  get title() {
    return this.#title;
  }
  set title(title: String) {
    this.#title = title;
  }
  get year() {
    return this.#year;
  }
  get rate() {
    return this.#rate;
  }
  get minPlayers() {
    return this.#minPlayers;
  }
  get maxPlayers() {
    return this.#maxPlayers;
  }
  get minAge() {
    return this.#minAge;
  }
  get price() {
    return this.#price;
  }
  set price(price: Number) {
    this.#price = price;
  }

  constructor(title: String, price: Number, id: string) {
    this.#title = title;
    this.#price = price;
    this.#_id = id;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent {
  games: Game[] = [];
  newGame: Game = new Game('', 0, '');

  constructor(private gamesDataService: GamesDataService) {}

  ngOnInit(): void {
    this.gamesDataService
      .getGames()
      .then((response) => this._setGames(response))
      .catch((error) => this._errorHandler(error));
  }

  private _errorHandler(error: any): void {
    console.log('While getting games. ', error);
  }

  private _setGames(games: Game[]): void {
    this.games = games;
  }

  addOne(): void {
    this.gamesDataService
      .addGame(this.newGame)
      .then((response) => console.log(response))
      .catch((error) => this._errorHandler(error));
  }
}
