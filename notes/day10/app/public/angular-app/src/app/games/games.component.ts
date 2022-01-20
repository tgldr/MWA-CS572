import { Component, OnInit } from '@angular/core';

class Game {
  #title!: String;
  #price!: Number;

  get title() {
    return this.#title;
  }
  get price() {
    return this.#price;
  }

  constructor(title: String, price: Number) {
    this.#title = title;
    this.#price = price;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent {
  games: Game[] = [];

  constructor() {
    let catan = new Game('Catan', 39.99);
    let game = new Game('Catan', 39.99);
    this.games.push(game);
    this.games.push(catan);
  }
}
