const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gpa: Number,
});

mongoose.model(process.env.DB_STUDENTS_MODEL, studentsSchema, "students");
