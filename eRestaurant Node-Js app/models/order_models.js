const path = require("path");
const DataService = require("../services/data_service");
const DishModel = require("../models/dish_models");
const { v4: uuid } = require("uuid");

const orderPath = path.join(__dirname, "..", "data", "db_order.json");
const dishPath = path.join(__dirname, "..", "data", "db_dish.json");

class OrderModel {
  static async getAllOrders() {
    return DataService.readJSONFile(orderPath);
  }
  static async getOrderByID(orderID) {
    const orders = await this.getAllOrders();
    const foundOrder = orders.find((order) => order.id === orderID);
    if (foundOrder) {
      return foundOrder;
    } else {
      return Promise.reject({ message: "No order found" });
    }
  }
  static async addNewOrder(newOrderData) {
    const dishes = await DishModel.getAllDishes();
    const orders = await this.getAllOrders();
    const orderExist = dishes.some(
      (dish) => dish.name === newOrderData.dishName
    );
    if (!orderExist) {
      return Promise.reject({ message: "Order not on the menu" });
    }
    const newOrder = {
      id: uuid(),
      ...newOrderData,
    };
    const updatedOrders = [...orders, newOrder];
    await DataService.saveJSONFile(orderPath, updatedOrders);
    return newOrder;
  }
  static async patchStatusOrder(orderID, orderUpdateData) {
    const orders = await this.getAllOrders();
    const foundOrder = await this.getOrderByID(orderID);
    const updatedOrder = { ...foundOrder, ...orderUpdateData };
    const updatedOrdersID = orders.map((order) =>
      order.id === foundOrder.id || order.dishName === foundOrder.dishName
        ? updatedOrder
        : order
    );
    if (!updatedOrdersID) return Promise.reject({ message: "Wrong update" });
    await DataService.saveJSONFile(orderPath, updatedOrdersID);
  }
  static async deleteOrder(orderID) {
    const orders = await this.getAllOrders();
    const updatedOrders = orders.filter((order) => order.id !== orderID);
    if (updatedOrders.length === orders.length) {
      return Promise.reject({ message: "Order not found" });
    }
    await DataService.saveJSONFile(orderPath, updatedOrders);
  }
}

module.exports = OrderModel;
