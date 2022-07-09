const Student = require("../models/student.model");

class StudentService {
  //1. Get all students
  static async getAllStudents() {
    const students = await Student.find({});
    return students;
  }
  //2. Get student by id
  static async getStudentById(studentId) {
    const student = await Student.findById(studentId);
    return student;
  }
  //3. Create a student
  static async createStudent(studentId) {
    const student = new Student(studentId);
    await student.save();
    return student;
  }
  //4. Update student
  static async updateStudent(studentId, updateData) {
    const student = await Student.findById(studentId);
    if (!student) return Promise.reject({ message: "Student not found" });

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach((key) => {
      if (key !== "_id") {
        student[key] = updateData[key];
      }
    });

    const updatedStudent = await student.save();
    return updatedStudent;
  }
  //5. Delete student
  static async deleteStudent(studentId) {
    await Student.findByIdAndDelete(studentId);
  }
}

module.exports = StudentService;
