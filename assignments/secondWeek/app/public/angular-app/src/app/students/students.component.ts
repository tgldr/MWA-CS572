import { Component, OnInit } from '@angular/core';
import { StudentApiService } from '../student-api.service';
export class Student {
  #_id!: string;
  #name!: String;
  #gpa!: Number;

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get gpa() {
    return this.#gpa;
  }

  constructor(name: String, gpa: Number, id: string) {
    this.#name = name;
    this.#gpa = gpa;
    this.#_id = id;
  }
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentsApiService: StudentApiService) {}

  ngOnInit(): void {
    this.studentsApiService
      .getStudents()
      .then((response) => this._setStudents(response))
      .catch((error) => this._errorHandler(error));
  }

  private _errorHandler(error: any): void {
    console.log('While getting students. ', error);
  }

  private _setStudents(students: Student[]): void {
    this.students = students;
  }
}
