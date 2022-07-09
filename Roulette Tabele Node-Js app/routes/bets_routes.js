const router = require("express").Router();
const BetsController = require("../controllers/bets_controller");
const ColorBetsController = require("../controllers/color_controller");
const EvenOrOddBetsController = require("../controllers/evenOrOdd_controller");

//Routes for bet numbers (1-36)
router.get("/all", BetsController.fetchAllBets);
router.post("/newBet", BetsController.createNewBet);
router.post("/startGame", BetsController.startGame);
//Routes for bet colors
router.get("/all-color", ColorBetsController.fetchAllColorBets);
router.post("/colorBet", ColorBetsController.createNewColorBet);
router.post("/startGame/color", ColorBetsController.startGame);
//Routes for bet even or odd
router.get("/all-evenOrOdd", EvenOrOddBetsController.fetchAllEvenOrOddBets);
router.post("/even-odd", EvenOrOddBetsController.createNewEvenOrOddBet);
router.post("/startGame/evenOrOdd", EvenOrOddBetsController.startGame);

module.exports = router;
