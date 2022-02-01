import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../login/login.component';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMsg!: string;
  hasError: boolean = false;
  successMsg: string = 'User Created';
  hasSuccess: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UsersDataService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      name: 'Jack',
      username: 'Username',
      password: '',
      passwordRepeat: '',
    });
  }

  onSubmit(form: FormGroup): void {
    let newUser: Credentials = new Credentials();
    newUser.fillFromForm(this.registrationForm);

    this.userService
      .createUser(newUser)
      .then(() => {
        form.reset();
        this.hasError = false;
        this.hasSuccess = true;
      })
      .catch((error) => this.failedToCreateUser(error));
  }

  failedToCreateUser(error: any): void {
    console.log('error');
    this.errorMsg = error.toString() || error.message.toString();
    this.hasError = true;
  }
}
