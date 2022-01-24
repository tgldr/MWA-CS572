import { Component, OnInit } from '@angular/core';
import { Student } from '../students/students.component';
import { ActivatedRoute } from '@angular/router';
import { StudentApiService } from '../student-api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  studentId!: string;
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private studentsApiService: StudentApiService
  ) {
    this.student = new Student('', 0.0, '');
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];
    this.studentsApiService
      .getStudent(this.studentId)
      .then((response) => {
        this.student = response;
      })
      .catch((error) => console.log('Error getting student:', error));
  }
}
