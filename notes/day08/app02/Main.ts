import { DE_Student } from "./DE_Student.js";

let jack = new DE_Student(123, "Jack", 3.0);

console.log(jack.id);
console.log(jack.getName());
console.log(jack.gpa);
console.log(jack);

console.log(jack.getName(), "is enrolled in", jack["course"]);
console.log(jack.getName(), "can you program?", jack["canProgram"]);

if (jack["canProgram"]) {
  console.log(jack.getName(), "please program");
  jack["program"]();
} else {
  console.log(jack.getName(), "dont'worry you will learn after this course.");
}
