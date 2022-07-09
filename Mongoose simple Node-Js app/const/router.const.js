const router = require("express").Router();

const trainerRouter = require("../routes/trainer.routes");
const courseRouter = require("../routes/course.routes");
const studentRouter = require("../routes/student.routes");

router.use("/trainers", trainerRouter);
router.use("/students", studentRouter);
router.use("/courses", courseRouter);

module.exports = router;
