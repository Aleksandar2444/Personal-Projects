const EvenOrOddBetsModel = require("../models/evenOrOdd_model");

class EvenOrOddBetsController {
  //@GET
  static async fetchAllEvenOrOddBets(req, res) {
    try {
      const bets = await EvenOrOddBetsModel.getAllBets();
      res.status(200).send(bets);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async createNewEvenOrOddBet(req, res) {
    try {
      const newBet = req.body;
      const createdBet = await EvenOrOddBetsModel.addNewBet(newBet);
      res.status(201).send(createdBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async startGame(req, res) {
    try {
      const finishedBet = await EvenOrOddBetsModel.startGame();
      res.status(201).send(finishedBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = EvenOrOddBetsController;
