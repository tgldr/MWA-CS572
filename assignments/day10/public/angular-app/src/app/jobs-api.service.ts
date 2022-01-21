import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class JobsApiService {
  private baseUrl: string = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getJobs(): Promise<Job[]> {
    const url: string = this.baseUrl + 'jobs';

    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Job[])
      .catch(this._handleError);
  }

  private _handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
