import { Component, OnInit } from '@angular/core';

export class Solve {
  #_id!: string;
  #solveStatus!: string;
  #scramble!: string;
  #time!: number;

  get _id() {
    return this.#_id;
  }
  get solveStatus() {
    return this.#solveStatus;
  }
  get scramble() {
    return this.#scramble;
  }
  get time() {
    return this.#time;
  }

  constructor(solveStatus: string, scramble: string, time: number, id: string) {
    this.#_id = id;
    this.#solveStatus = solveStatus;
    this.#scramble = scramble;
    this.#time = time;
  }
}

@Component({
  selector: 'app-solve',
  templateUrl: './solve.component.html',
  styleUrls: ['./solve.component.css'],
})
export class SolveComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
