const OrderModel = require("../models/order_models");

class OrderController {
  static async fetchAllOrders(req, res) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async fetchOrderByID(req, res) {
    try {
      const { id: orderID } = req.params;
      const order = await OrderModel.getOrderByID(orderID);
      res.status(200).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async createNewOrder(req, res) {
    try {
      const newOrderData = req.body;
      const createdOrder = await OrderModel.addNewOrder(newOrderData);
      res.status(201).send(createdOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async updateOrder(req, res) {
    try {
      const orderID = req.params.id;
      const orderUpdates = req.body;
      if (!orderUpdates.id && !orderUpdates.dishName) {
        res.status(400).send({ message: "Invalid Update" });
      }
      await OrderModel.patchStatusOrder(orderID, orderUpdates);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static async deleteOrder(req, res) {
    try {
      const orderID = req.params.id;
      await OrderModel.deleteOrder(orderID);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;
