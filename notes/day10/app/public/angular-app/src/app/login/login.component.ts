import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { UsersDataService } from '../users-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export class Credentials {
  name!: string;
  username!: string;
  password!: string;

  fillFromForm(form: FormGroup | NgForm) {
    this.name = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  set isLoggedIn(isLoggedIn: boolean) {
    this.authService.isLoggedIn = isLoggedIn;
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  #name: string = '';
  get name() {
    return this.#name;
  }
  set name(name: string) {
    this.#name = name;
  }

  @ViewChild('loginForm')
  loginForm!: NgForm;
  credentials!: Credentials;

  constructor(
    private userService: UsersDataService,
    private authService: AuthenticationService,
    private jwtService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.credentials = new Credentials();
    this.credentials.username = 'Jack2022';
    this.credentials.password = '123';

    setTimeout(() => {
      this.loginForm.setValue(this.credentials);
    }, 0);
  }

  onSubmit(form: NgForm): void {
    let user: Credentials = new Credentials();
    user.fillFromForm(form);

    this.userService.login(user).then((response) => {
      this.authService.isLoggedIn = true;
      this.authService.token = response.token;
      const decoded = this.jwtService.decodeToken(response.token);

      this.name = decoded.name;
    });
  }

  reset(form: NgForm) {
    form.reset();
  }

  logout(): void {
    this.authService.isLoggedIn = false;
    this.authService.deleteToken();
  }
}
