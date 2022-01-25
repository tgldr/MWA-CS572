import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  x = 12;
  word = 'Jack';
  constructor() {}

  ngOnInit(): void {}
}
