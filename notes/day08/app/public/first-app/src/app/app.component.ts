import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hello Angular';
  #name = 'Jack';
  people: string[] = ['Najeeb', 'Najeeb', 'Najeeb'];
  students = [
    {
      name: 'Najeeb 1',
      gpa: 3.0,
      course: 'MWA',
    },
    {
      name: 'Najeeb 2',
      gpa: 3.1,
      course: 'MWA',
    },
    {
      name: 'Najeeb 3',
      gpa: 3.0,
      course: 'MWA',
    },
    {
      name: 'Najeeb 4',
      gpa: 3.1,
      course: 'MWA',
    },
  ];
  showHidden: boolean = true;
  dd = new Date();

  get name() {
    return this.#name;
  }

  onClickButton() {
    this.title = 'Clicked';
  }
}
