import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root',
})
export class GamesDataService {
  private baseUrl: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  getGames(): Promise<Game[]> {
    const url: string = this.baseUrl + 'games';
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Game[])
      .catch(this._handleError);
  }

  getGame(id: string): Promise<Game> {
    const url: string = `${this.baseUrl}game/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Game)
      .catch(this._handleError);
  }

  private _handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
