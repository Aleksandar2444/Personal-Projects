const router = require("express").Router();
const dishesRouter = require("../routes/dish_routes");
const orderRouter = require("../routes/order_routes");
const authRouter = require("../routes/auth_routes");

router.use(authRouter);

router.use("/dishes", dishesRouter);
router.use("/orders", orderRouter);

module.exports = router;
