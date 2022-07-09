const router = require("express").Router();
const cars = require("./routes/cars.routes");

router.use("/cars", cars);

module.exports = router;
