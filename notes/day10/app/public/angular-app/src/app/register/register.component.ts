import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this._formBuilder.group({
      name: 'Jack',
      username: 'Username',
      password: '',
      passwordRepeat: '',
    });
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value);
    this.registrationForm = form;
  }
}
