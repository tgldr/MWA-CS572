import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Theater } from './theaters/theaters.component';

@Injectable({
  providedIn: 'root',
})
export class TheatersDataService {
  private apiBaseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getStates(): Promise<string[]> {
    const url: string = `${this.apiBaseUrl}/theaters/states`;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  public getTheaters(
    offset: number,
    count: number,
    state: string
  ): Promise<Theater[]> {
    state = state === 'ALL' ? '' : state;
    const url: string = `${this.apiBaseUrl}/theaters?offset=${offset}&count=${count}&state=${state}`;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  public getTheatersByLocation(
    lng: number,
    lat: number,
    distance: number
  ): Promise<Theater[]> {
    const url: string = `${this.apiBaseUrl}/theaters?lat=${lat}&lng=${lng}&distance=${distance}`;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  public getTheater(theaterId: string): Promise<Theater> {
    const url: string = this.apiBaseUrl + '/theaters/' + theaterId;

    return this.http.get(url).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
