import { Component } from '@angular/core';
import { JobsApiService } from './jobs-api.service';
class Point {
  #coordinates: number[];

  get coordinates() {
    return this.#coordinates;
  }

  constructor(coordinates: number[]) {
    this.#coordinates = coordinates;
  }
}

export class Job {
  #_id!: string;
  #title!: string;
  #description: string;
  #experience: string;
  #skills: string[];
  #postDate: Date;
  #location: Point;

  get _id() {
    return this.#_id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get experience() {
    return this.#experience;
  }

  get skills() {
    return this.#skills;
  }

  get postDate() {
    return this.#postDate;
  }

  get location() {
    return this.#location;
  }

  constructor(
    title: string,
    description: string,
    experience: string,
    skills: string[],
    postDate: Date,
    location: Point
  ) {
    this.#title = title;
    this.#description = description;
    this.#experience = experience;
    this.#skills = skills;
    this.#postDate = postDate;
    this.#location = location;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  jobs: Job[] = [];

  constructor(private jobsApiService: JobsApiService) {}

  ngOnInit(): void {
    this.jobsApiService
      .getJobs()
      .then((response) => this._setJobs(response))
      .catch((error) => this._errorHandler(error));
  }

  private _errorHandler(error: any): void {
    console.log('While getting jobs', error);
  }

  private _setJobs(jobs: Job[]): void {
    this.jobs = jobs;
  }
}
