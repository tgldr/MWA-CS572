import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export class Credentials {
  username!: string;
  password!: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;

  credentials!: Credentials;

  constructor() {}

  ngOnInit(): void {
    this.credentials = new Credentials();
    this.credentials.username = 'Jack2022';
    this.credentials.password = '123';

    setTimeout(() => {
      this.loginForm.setValue(this.credentials);
    }, 0);
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }

  reset(form: NgForm) {
    form.reset();
  }
}
