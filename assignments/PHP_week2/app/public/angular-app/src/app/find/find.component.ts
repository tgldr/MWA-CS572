import { Component, OnInit } from '@angular/core';
import { SessionApiService } from '../session-api.service';
import { Session } from '../sessions/sessions.component';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
})
export class FindComponent implements OnInit {
  sessionName!: string;
  sessions: Session[] = [];
  constructor(private sessionService: SessionApiService) {}

  ngOnInit(): void {}

  searchSession(): void {
    this.sessionService
      .findSessionByName(this.sessionName)
      .then((response) => {
        this.sessions = response;
      })
      .catch((error) => this.errorHandler(error));
  }

  private errorHandler(error: any): void {
    console.log('While getting sessions', error);
  }
}
