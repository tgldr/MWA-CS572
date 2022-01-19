import { Component, OnInit } from '@angular/core';
import { FactsApiService } from '../facts-api.service';

export class Fact {
  #index!: String;
  #name!: String;
  #url!: String;

  get index() {
    return this.#index;
  }
  get name() {
    return this.#name;
  }

  get url() {
    return this.#url;
  }

  constructor(index: String, name: String, url: String) {
    this.#index = index;
    this.#name = name;
    this.#url = url;
  }
}

@Component({
  selector: 'app-age-of-empires',
  templateUrl: './age-of-empires.component.html',
  styleUrls: ['./age-of-empires.component.css'],
})
export class AgeOfEmpiresComponent implements OnInit {
  civilizations: Fact[] = [];
  level = 1;

  constructor(private factsService: FactsApiService) {
    factsService.getFacts(this.level).then((facts) => {
      console.log(facts);
      this.civilizations = facts;
    });
  }

  ngOnInit(): void {}
  onClickButton(level: number) {
    this.level = level;
    this.factsService.getFacts(this.level).then((facts) => {
      console.log(facts);
      this.civilizations = facts;
    });
  }
}
