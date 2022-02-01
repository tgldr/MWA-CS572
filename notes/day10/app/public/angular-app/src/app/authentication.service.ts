import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #isLoggedIn: boolean = false;
  set isLoggedIn(isLoggedIn: boolean) {
    this.#isLoggedIn = isLoggedIn;
  }
  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  set token(token: string) {
    localStorage.setItem(environment.local_storage_token, token);
  }

  constructor() {}

  deleteToken() {
    localStorage.removeItem(environment.local_storage_token);
  }
}
