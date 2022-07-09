const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  numberOfClasses: {
    type: String,
    required: true,
    min: 1,
  },
  trainer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
    },
  ],
  assistant: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.model("New-Course", courseSchema);

module.exports = Course;
