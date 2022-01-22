import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private baseUrl: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  getMovies(): Promise<Movie[]> {
    const url: string = this.baseUrl + 'movies';
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Movie[])
      .catch(this._handleError);
  }

  private _handleError(error: any): Promise<any> {
    console.log('err', error);
    return Promise.reject(error.message || error);
  }
}
