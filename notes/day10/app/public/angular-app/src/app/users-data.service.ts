import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from './login/login.component';
import { environment } from 'src/environments/environment';

export class TokenResponse {
  success!: boolean;
  token!: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private http: HttpClient) {}

  createUser(user: Credentials): Promise<Credentials> {
    const url: string = environment.base_url + environment.rest_api_create_user;
    return this.http
      .post(url, user)
      .toPromise()
      .catch((error) => this._handleError(error));
  }

  login(user: Credentials): Promise<TokenResponse> {
    const url: string = environment.base_url + environment.rest_api_user_login;
    return this.http
      .post(url, user)
      .toPromise()
      .catch((error) => this._handleError(error));
  }

  private _handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
