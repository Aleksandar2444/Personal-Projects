const path = require("path");
const DataService = require("../services/data_service");
const { v4: uuid } = require("uuid");

const resultsOfBets = path.join(__dirname, "..", "data", "resultOfBets.json");
const betColorPath = path.join(__dirname, "..", "data", "betColor.json");

class ColorBetsModel {
  //@GET
  static async getAllColorBets() {
    return DataService.readJSONFile(betColorPath);
  }
  //@POST
  static async addNewBet(newBetData) {
    const bets = await this.getAllColorBets();
    //Check if the betType is red or black
    if (newBetData.betType !== "red" && newBetData.betType !== "black") {
      return Promise.reject({ message: "Wrong Input" });
    }
    //Check if we bet on the same color in the same round
    const checkBetType = bets.some((bet) => bet.betType === newBetData.betType);

    if (checkBetType) {
      return Promise.reject({
        message: `You have already active bet on the ${newBetData.betType} color`,
      });
    }

    const newBet = {
      id: uuid(),
      ...newBetData,
      status: "active",
    };

    const updatedBets = [...bets, newBet];
    await DataService.saveJSONFile(betColorPath, updatedBets);
    return newBet;
  }
  //@POST
  static async startGame() {
    const bets = await this.getAllColorBets();
    //Check if the data is empty
    if (bets.length === 0) {
      return Promise.reject({ message: "No bet placed!" });
    }
    //Getting random color from the colors array
    const colors = ["red", "black"];
    Array.prototype.random = function () {
      return this[Math.floor(Math.random() * this.length)];
    };
    //Saving the result of the comparing color function in const
    const randomColor = colors.random();
    console.log(randomColor);
    //Comparing the random color with the color of the betType
    const compareBetTypeColor = bets.every(
      (bet) => bet.betType !== randomColor
    );

    if (compareBetTypeColor) {
      const endRoundLost = {
        id: uuid(),
        status: "completed",
        message: "Bet lost. Better luck on the next round!",
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundLost);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(betColorPath, []);
      return endRoundLost;
    }

    if (!compareBetTypeColor) {
      const endRoundWon = {
        id: uuid(),
        status: "completed",
        message: `You won $${bets[0].amount * 2}`,
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundWon);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(betColorPath, []);
      return endRoundWon;
    }
  }
}
module.exports = ColorBetsModel;
