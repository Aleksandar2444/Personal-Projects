const router = require("express").Router();
const betsRouter = require("../routes/bets_routes");

router.use("/roulette", betsRouter);

module.exports = router;
