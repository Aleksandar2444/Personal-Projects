const path = require("path");
const DataService = require("../services/data_service");
const { v4: uuid } = require("uuid");

const evenOrOddPath = path.join(__dirname, "..", "data", "evenOrOdd.json");
const resultsOfBets = path.join(__dirname, "..", "data", "resultOfBets.json");

class EvenOrOddBetsModel {
  //@GET
  static async getAllBets() {
    return DataService.readJSONFile(evenOrOddPath);
  }
  //@POST
  static async addNewBet(newBetData) {
    const bets = await this.getAllBets();
    //Check if the betType is even or odd
    if (newBetData.betType !== "even" && newBetData.betType !== "odd") {
      return Promise.reject({ message: "Wrong Input" });
    }
    //Check if we bet on the same even or odd number in the same round
    const checkBetType = bets.some((bet) => bet.betType === newBetData.betType);

    if (checkBetType) {
      return Promise.reject({
        message: `You have already active bet on ${newBetData.betType} number.`,
      });
    }

    const newBet = {
      id: uuid(),
      ...newBetData,
      status: "active",
    };

    const updatedBets = [...bets, newBet];
    await DataService.saveJSONFile(evenOrOddPath, updatedBets);
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
    const number = Math.floor(Math.random() * 37);
    console.log(number);
    //Check if the random number is even or odd
    if (number % 2 === 0 && bets[0].betType === "even") {
      const endRoundWon = {
        id: uuid(),
        status: "completed",
        message: `You won $${bets[0].amount * 2}`,
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundWon);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(evenOrOddPath, []);
      return endRoundWon;
    } else if (number % 2 === 1 && bets[0].betType === "odd") {
      const endRoundLost = {
        id: uuid(),
        status: "completed",
        message: `You won $${bets[0].amount * 2}`,
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundLost);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(evenOrOddPath, []);
      return endRoundLost;
    } else {
      const endRoundWon = {
        id: uuid(),
        status: "completed",
        message: `Bet lost! Better luck on the next round!`,
      };
      await DataService.saveJSONFile(resultsOfBets, endRoundWon);
      //We are clearing the data base with bets
      //Is it a good way to clear data like this?
      await DataService.saveJSONFile(evenOrOddPath, []);
      return endRoundWon;
    }
  }
}

module.exports = EvenOrOddBetsModel;
