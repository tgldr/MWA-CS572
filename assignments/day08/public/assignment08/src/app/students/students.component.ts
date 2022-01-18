import { Component } from '@angular/core';
import school from '../../assets/school.json';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students = school;
}
