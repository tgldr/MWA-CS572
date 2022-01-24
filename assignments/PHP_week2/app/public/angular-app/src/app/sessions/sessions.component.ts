import { Component, OnInit } from '@angular/core';
import { Solve } from '../solve/solve.component';
import { SessionApiService } from '../session-api.service';

export class Session {
  #_id!: string;
  #title!: string;
  #solves!: Solve[];

  get _id() {
    return this.#_id;
  }

  set _id(id: string) {
    this.#_id = id;
  }

  get title() {
    return this.#title;
  }

  set title(title: string) {
    this.#title = title;
  }

  get solves() {
    return this.#solves;
  }

  constructor(title: string, id: string, solves: Solve[]) {
    this.#_id = id;
    this.#title = title;
    this.#solves = solves;
  }
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css'],
})
export class SessionsComponent implements OnInit {
  newSession: Session = new Session('', '', []);
  session!: Session;
  sessions: Session[] = [];

  constructor(private sessionService: SessionApiService) {}

  ngOnInit(): void {
    this._getSessions();
  }

  private _getSessions(): void {
    this.sessionService
      .getSessions()
      .then((response) => {
        this._setSessions(response);
      })
      .catch((error) => this.errorHandler(error));
  }

  onChangeObj(session: any): void {
    this.session = session;
  }

  getSession(id: string): void {
    this.sessionService
      .getSession(id)
      .then((response) => {
        this.session = response;
      })
      .catch((error) => this.errorHandler(error));
  }

  private errorHandler(error: any): void {
    console.log('While getting sessions', error);
  }

  private _setSessions(sessions: Session[]): void {
    this.sessions = sessions;
  }

  addSession(): void {
    this.sessionService
      .addSession(this.newSession)
      .then(() => {
        this.newSession = new Session('', '', []);
        this._getSessions();
      })
      .catch((error: any) => this.errorHandler(error));
  }

  deleteSession(): void {
    this.sessionService
      .delete(this.session)
      .then(() => this._getSessions())
      .catch((error: any) => this.errorHandler(error));
  }

  deleteSolve(id: string): void {
    this.sessionService
      .deleteSolve(this.session, id)
      .then(() => {
        this._getSessions();
      })
      .catch((error: any) => this.errorHandler(error));
  }
}
