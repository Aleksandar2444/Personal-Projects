const PlayersModel = require("../models/players_model");

class PlayersController {
  static async fetchAllPlayers(req, res) {
    try {
      const players = await PlayersModel.getAllPlayers();
      res.status(200).send(players);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async fetchPlayerByID(req, res) {
    try {
      const { id: playerID } = req.params;
      const player = await PlayersModel.getPlayerByID(playerID);
      res.status(200).send(player);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async createNewPlayer(req, res) {
    try {
      const newPlayerData = req.body;
      const createdPlayer = await PlayersModel.addNewPlayer(newPlayerData);
      res.status(201).send(createdPlayer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async updatePlayer(req, res) {
    try {
      const playerID = req.params.id;
      const playerUpdates = req.body;
      if (playerUpdates.id)
        res.status(400).send({ message: "Invalid update!" });
      await PlayersModel.updatePlayer(playerID, playerUpdates);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async deletePlayer(req, res) {
    try {
      const playerID = req.params.id;
      await PlayersModel.deletePlayer(playerID);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
module.exports = PlayersController;
