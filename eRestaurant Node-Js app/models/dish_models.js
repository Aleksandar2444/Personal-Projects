const path = require("path");
const DataService = require("../services/data_service");
const { v4: uuid } = require("uuid");

const dishesPath = path.join(__dirname, "..", "data", "db_dish.json");

class DishesModel {
  static async getAllDishes() {
    return DataService.readJSONFile(dishesPath);
  }
  static async getDishesByID(dishesID) {
    const dishes = await this.getAllDishes();
    const foundDish = dishes.find((dish) => dish.id === dishesID);
    if (foundDish) {
      return foundDish;
    } else {
      return Promise.reject({ message: "No dish found" });
    }
  }
  static async addNewDishes(newDishData) {
    const dishes = await this.getAllDishes();
    const nameExist = dishes.some((dish) => dish.name === newDishData.name);
    // const validatePrice = dishes.every(
    //   (dish) => dish.price < 1 || dish.price > 1000
    // );
    if (newDishData.price < 1 || newDishData.price > 1000) {
      return Promise.reject({
        message: "Your price must be above $1 or below $1000",
      });
    }

    if (nameExist)
      return Promise.reject({
        message: `The dish with name (${newDishData.name}) already exist`,
      });
    const newDish = {
      id: uuid(),
      ...newDishData,
    };
    const updatedDishes = [...dishes, newDish];
    await DataService.saveJSONFile(dishesPath, updatedDishes);
    return newDish;
  }
  static async updateDish(dishID, dishUpdateData) {
    const dishes = await this.getAllDishes();
    const foundDish = await this.getDishesByID(dishID);
    const updatedDish = { ...foundDish, ...dishUpdateData };
    const updatedDishes = dishes.map((dish) =>
      dish.id === foundDish.id ? updatedDish : dish
    );
    await DataService.saveJSONFile(dishesPath, updatedDishes);
  }
  static async deleteDish(dishID) {
    const dishes = await this.getAllDishes();
    const updatedDishes = dishes.filter((dish) => dish.id !== dishID);
    if (updatedDishes.length === dishes.length) {
      return Promise.reject({ message: "Dish not found" });
    }
    await DataService.saveJSONFile(dishesPath, updatedDishes);
  }
}

module.exports = DishesModel;
