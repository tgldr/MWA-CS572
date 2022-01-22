import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../movies-api.service';

export class Movie {
  #_id!: string;
  #title!: string;

  get _id() {
    return this.#_id;
  }

  get title() {
    return this.#title;
  }

  constructor(title: string) {
    this.#title = title;
  }
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesApiService: MoviesApiService) {}

  ngOnInit(): void {
    this.moviesApiService
      .getMovies()
      .then((response) => this._setMovies(response))
      .catch((error) => this._errorHandler(error));
  }

  private _setMovies(movies: Movie[]): void {
    this.movies = movies;
  }

  private _errorHandler(error: any): void {
    console.log('err', error);
  }
}
