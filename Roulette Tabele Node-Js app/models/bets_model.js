const path = require("path");
const DataService = require("../services/data_service");
const { v4: uuid } = require("uuid");

const betsPath = path.join(__dirname, "..", "data", "bets.json");
const resultsOfBets = path.join(__dirname, "..", "data", "resultOfBets.json");

class BetsModel {
  //@GET
  static async getAllBets() {
    return DataService.readJSONFile(betsPath);
  }
  //@POST
  static async addNewBet(newBetData) {
    const bets = await this.getAllBets();
    //Check if the betType is number
    if (isNaN(newBetData.betType) || newBetData.betType === "") {
      return Promise.reject({ message: "Wrong Input" });
    }
    //Check if the betType is integer
    if (!Number.isInteger(newBetData.betType)) {
      return Promise.reject({ message: "Wrong Input" });
    }
    //Check if the betType is a number from 1 to 36
    if (newBetData.betType < 1 || newBetData.betType > 36) {
      return Promise.reject({ message: "Wrong number" });
    }
    //Check if we bet on the same number in the same round
    const checkBetType = bets.some((bet) => bet.betType === newBetData.betType);

    if (checkBetType) {
      return Promise.reject({
        message: `You have already active bet on number ${newBetData.betType}`,
      });
    }

    const newBet = {
      id: uuid(),
      ...newBetData,
      status: "active",
    };
    const updatedBets = [...bets, newBet];
    await DataService.saveJSONFile(betsPath, updatedBets);
    return newBet;
  }
  //@POST
  static async startGame() {
    const bets = await this.getAllBets();
    //Check if the data is empty
    if (bets.length === 0) {
      return Promise.reject({ message: "No bet placed!" });
    }
    //We get random number from 1 to 36
    const numbers = Math.floor(Math.random() * 37);
    console.log(numbers);
    //Compare the random number with our betType
    const compareBetType = bets.every((bet) => bet.betType !== numbers);
    //I've made some logic here
    //If we have more bets to calculate the amount of those bets
    const sumAmount = bets.reduce((n, { amount }) => n + amount, 0);
    console.log(sumAmount);

    if (compareBetType) {
      const endRoundLost = {
        id: uuid(),
        status: "completed",
        message: "Bet lost. Better luck on the next round!",
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundLost);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(betsPath, []);
      return endRoundLost;
    }

    if (!compareBetType) {
      const endRoundWon = {
        id: uuid(),
        status: "completed",
        message: `You won $${sumAmount * 2}`,
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundWon);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(betsPath, []);
      return endRoundWon;
    }
  }
}

module.exports = BetsModel;
