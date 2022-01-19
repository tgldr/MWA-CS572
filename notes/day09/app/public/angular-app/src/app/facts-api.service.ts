import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fact } from './age-of-empires/age-of-empires.component';

@Injectable({
  providedIn: 'root',
})
export class FactsApiService {
  #apiBaseUrl: string = 'https://www.dnd5eapi.co/api/';

  constructor(private http: HttpClient) {}

  public getFacts(level: number): Promise<Fact[]> {
    console.log('getFacts called');
    const url: string = this.#apiBaseUrl + 'spells?level=' + level;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response.results as Fact[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
