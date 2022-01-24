import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Session } from './sessions/sessions.component';
import { Solve } from './solve/solve.component';

@Injectable({
  providedIn: 'root',
})
export class SessionApiService {
  #apiBaseUrl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  public getSessions(): Promise<Session[]> {
    const url: string = this.#apiBaseUrl + 'sessions';
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Session[])
      .catch(this.handleError);
  }

  public getSession(id: string): Promise<Session> {
    const url: string = this.#apiBaseUrl + 'sessions/' + id;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Session)
      .catch(this.handleError);
  }

  public addSession(newSession: Session): Promise<Session> {
    const url: string = this.#apiBaseUrl + 'sessions';
    return this.http
      .post(url, {
        title: newSession.title,
      })
      .toPromise()
      .then((response: any) => response as Session[])
      .catch(this.handleError);
  }

  public delete(session: Session): Promise<Session> {
    const url: string = this.#apiBaseUrl + 'sessions/' + session._id;
    return this.http
      .delete(url)
      .toPromise()
      .then((response: any) => response as Session[])
      .catch(this.handleError);
  }

  public deleteSolve(session: Session, id: string): Promise<Session> {
    const url: string =
      this.#apiBaseUrl + 'sessions/' + session._id + '/solve/' + id;
    return this.http.delete(url).toPromise().catch(this.handleError);
  }

  public addSolve(
    session: Session,
    newSolve: { scramble: string; time: string }
  ): Promise<Session> {
    const url: string = this.#apiBaseUrl + 'sessions/' + session._id + '/solve';

    return this.http
      .post(url, {
        time: newSolve.time,
        scramble: newSolve.scramble,
      })
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('Something wrong', error);
    return Promise.reject(error.message || error);
  }
}
