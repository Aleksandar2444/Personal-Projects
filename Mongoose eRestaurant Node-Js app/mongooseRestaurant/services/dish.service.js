const Dish = require("../models/dish.model");

class DishService {
  //1. Get all dishes
  static async getAllDishes() {
    const dishes = await Dish.find({});
    return dishes;
  }
  //2. Get dish by id
  static async getDishById(dishId) {
    const dish = await Dish.findById(dishId).populate("orders");
    if (!dish) return Promise.reject({ message: "Dish not found" });
    return dish;
  }
  //3. Create dish
  static async createDish(dishData) {
    const dish = new Dish(dishData);
    await dish.save();
    return dish;
  }
  //4. Update dish
  static async updateDish(dishId, updateData) {
    const dish = await Dish.findById(dishId);
    if (!dish) return Promise.reject({ message: "Dish not found" });

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach((key) => {
      if (key !== "_id") {
        dish[key] = updateData[key];
      }
    });

    const updatedDish = await dish.save();
    return updatedDish;
  }
  //5. Delete dish
  static async deleteDish(dishId) {
    await Dish.findByIdAndDelete(dishId);
  }
  //6. Update orders property in dish model
  static async updateOrders(dishId, orderIds) {
    const dish = await this.getDishById(dishId);
    dish.orders = orderIds;
    dish.orders.forEach(async (orderId) => {
      await this.updateDish(orderId, { dish: dish._id });
    });
    await dish.save();
    return dish;
  }
}

module.exports = DishService;
