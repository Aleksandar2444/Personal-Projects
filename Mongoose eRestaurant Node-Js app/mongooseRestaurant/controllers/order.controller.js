const OrderService = require("../services/order.service");

class OrderController {
  //1. Get all orders
  static async getAllOrders(req, res) {
    try {
      const order = await OrderService.getAllOrders();
      res.status(200).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //2. Get order by id
  static async getOrderById(req, res) {
    try {
      const orderId = req.params.id;
      const order = await OrderService.getOrderById(orderId);

      if (!order)
        return res
          .status(404)
          .send({ message: `Order with id: ${orderId} not found` });
      res.status(200).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //3. Create order
  static async createOrder(req, res) {
    try {
      const orderData = req.body;
      const order = await OrderService.createOrder(orderData);
      res.status(201).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //4. Update order
  static async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const updates = req.body;

      const updateOrder = await OrderService.updateOrder(orderId, updates);
      res.status(200).send(updateOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //5. Delete order
  static async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const response = await OrderService.deleteOrder(orderId);

      if (!response)
        return res
          .status(404)
          .send({ message: `Dish with id: ${orderId} not found` });
      res.status(200).send(error);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //6. Update dish property in order model
  static async updateDishes(req, res) {
    try {
      const orderId = req.params.id;
      const disheIds = req.body.disheIds;

      const updatedOrder = await DishService.updateOrders(orderId, disheIds);
      res.status(200).send(updatedOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;
