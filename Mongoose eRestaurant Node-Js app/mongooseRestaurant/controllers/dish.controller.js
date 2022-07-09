const DishService = require("../services/dish.service");

class DishController {
  //1. Get all dishes
  static async getAllDishes(req, res) {
    try {
      const dish = await DishService.getAllDishes();
      res.status(200).send(dish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //2. Get dish by id
  static async getDishById(req, res) {
    try {
      const dishId = req.params.id;
      const dish = await DishService.getDishById(dishId);

      if (!dish)
        return res
          .status(404)
          .send({ message: `Dish with id: ${dishId} not found` });
      res.status(200).send(dish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //3. Create dish
  static async createDish(req, res) {
    try {
      const dishData = req.body;
      const dish = await DishService.createDish(dishData);
      res.status(201).send(dish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //4. Update dish
  static async updateDish(req, res) {
    try {
      const dishId = req.params.id;
      const updates = req.body;

      const updatedDish = await DishService.updateDish(dishId, updates);
      res.status(200).send(updatedDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //5. Delete dish
  static async deleteDish(req, res) {
    try {
      const dishId = req.params.id;
      const response = await DishService.deleteDish(dishId);

      if (!response)
        return res
          .status(404)
          .send({ message: `Dish with id: ${dishId} not found` });
      res.status(200).send(error);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //6. Update orders property in dish model
  static async updateOrders(req, res) {
    try {
      const dishId = req.params.id;
      const orderIds = req.body.orderIds;

      const updatedDish = await DishService.updateOrders(dishId, orderIds);
      res.status(200).send(updatedDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
