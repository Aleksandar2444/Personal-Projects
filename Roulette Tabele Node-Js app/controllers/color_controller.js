const ColorBetsModel = require("../models/color_model");

class ColorBetsController {
  //@GET
  static async fetchAllColorBets(req, res) {
    try {
      const bets = await ColorBetsModel.getAllColorBets();
      res.status(200).send(bets);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async createNewColorBet(req, res) {
    try {
      const newBet = req.body;
      const createdBet = await ColorBetsModel.addNewBet(newBet);
      res.status(201).send(createdBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //@POST
  static async startGame(req, res) {
    try {
      const finishedBet = await ColorBetsModel.startGame();
      res.status(201).send(finishedBet);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
module.exports = ColorBetsController;
