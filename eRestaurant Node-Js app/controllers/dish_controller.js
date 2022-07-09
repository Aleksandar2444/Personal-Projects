const DishModel = require("../models/dish_models");

class DishesController {
  static async fetcAllDishes(req, res) {
    try {
      const dishes = await DishModel.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async fetchDishesByID(req, res) {
    try {
      const { id: dishesID } = req.params;
      const dish = await DishModel.getDishesByID(dishesID);
      res.status(200).send(dish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async createNewDish(req, res) {
    try {
      const newDishData = req.body;
      const createdDish = await DishModel.addNewDishes(newDishData);
      res.status(201).send(createdDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async updateDishes(req, res) {
    try {
      const dishID = req.params.id;
      const dishUpdate = req.body;
      if (dishUpdate.id) res.status(400).send({ message: "Invalid Update" });
      await DishModel.updateDish(dishID, dishUpdate);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async deleteDishes(req, res) {
    try {
      const dishID = req.params.id;
      await DishModel.deleteDish(dishID);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = DishesController;
