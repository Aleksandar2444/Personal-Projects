const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: 2,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: 2,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be greater than 18"],
    max: [65, "Age must be less than 65"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => validator.isEmail(val),
    },
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
