import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './students/students.component';

@Injectable({
  providedIn: 'root',
})
export class StudentApiService {
  private baseUrl: string = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  getStudents(): Promise<Student[]> {
    const url: string = this.baseUrl + 'students';
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Student[])
      .catch(this._handleError);
  }

  getStudent(id: string): Promise<Student> {
    const url: string = `${this.baseUrl}students/${id}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response: any) => response as Student)
      .catch(this._handleError);
  }

  private _handleError(error: any): Promise<any> {
    console.log('Something went wrong', error);
    return Promise.reject(error.message || error);
  }
}
