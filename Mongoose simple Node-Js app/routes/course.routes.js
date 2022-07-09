const router = require("express").Router();
const CourseController = require("../controllers/course.controller");

//Trainer routes
router.get("/", CourseController.getAllCourses);
router.get("/:id", CourseController.getCourseById);
router.post("/", CourseController.createCourse);
router.patch("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);
router.patch("/:id/update-trainer", CourseController.updateTrainers);
router.patch("/:id/update-students", CourseController.updateStudents);

module.exports = router;
