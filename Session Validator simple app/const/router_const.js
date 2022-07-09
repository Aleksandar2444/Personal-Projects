const router = require("express").Router();
const playersRouter = require("../routes/players_routes");
const authRouter = require("../routes/auth_routes");

router.use("/players", playersRouter);
router.use("/auth", authRouter);

module.exports = router;
