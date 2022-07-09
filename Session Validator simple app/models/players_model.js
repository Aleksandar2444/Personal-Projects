const path = require("path");
const DataService = require("../services/data_services");
const { v4: uuid } = require("uuid");

const playersPath = path.join(__dirname, "..", "data", "dbPlayers.json");

class PlayerModel {
  static async getAllPlayers() {
    return DataService.readJSONFile(playersPath);
  }
  static async getPlayerByID(playerID) {
    const players = await this.getAllPlayers();
    const foundPlayer = players.find((player) => player.id === playerID);
    if (foundPlayer) {
      return foundPlayer;
    } else {
      return Promise.reject({ message: "No player found" });
    }
  }
  static async addNewPlayer(newPlayerData) {
    const players = await this.getAllPlayers();
    const checkEmail = players.some(
      (player) => player.email === newPlayerData.email
    );
    if (checkEmail)
      return Promise.reject({ message: "Email already registered" });
    const newPlayer = {
      id: uuid(),
      ...newPlayerData,
    };
    const updatedPlayer = [...players, newPlayer];
    await DataService.saveJSONFile(playersPath, updatedPlayer);
    return newPlayer;
  }
  static async updatePlayer(playerID, playerUpdateData) {
    const players = await this.getAllPlayers();
    const foundPlayer = await this.getPlayerByID(playerID);
    const updatePlayer = { ...foundPlayer, ...playerUpdateData };
    const updatedPlayers = players.map((player) =>
      player.id === foundPlayer.id ? updatePlayer : player
    );
    await DataService.saveJSONFile(playersPath, updatedPlayers);
  }
  static async deletePlayer(playerID) {
    const players = await this.getAllPlayers();
    const updatedPlayers = players.filter((player) => player.id !== playerID);
    if (updatedPlayers.length === players.length) {
      return Promise.reject({ message: "Player not found" });
    }
    await DataService.saveJSONFile(playersPath, updatedPlayers);
  }
}
module.exports = PlayerModel;
