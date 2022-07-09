const BetsModel = require("../models/bets_model");

class BetsController {
  //@GET
  static async fetchAllBets(req, res) {
    try {
      const bets = await BetsModel.getAllBets();
      res.status(200).send(bets);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async createNewBet(req, res) {
    try {
      const newBet = req.body;
      const createdBet = await BetsModel.addNewBet(newBet);
      res.status(201).send(createdBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async startGame(req, res) {
    try {
      const finishedBet = await BetsModel.startGame();
      res.status(201).send(finishedBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = BetsController;
