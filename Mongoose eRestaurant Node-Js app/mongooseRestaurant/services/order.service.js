const Order = require("../models/order.model");

class OrderService {
  //1. Get all orders
  static async getAllOrders() {
    const order = await Order.find({});
    return order;
  }
  //2. Get order by id
  static async getOrderById(orderId) {
    const order = await Order.findById(orderId).populate("dish");
    if (!order) return Promise.reject({ message: "Order not found" });
    return order;
  }
  //3. Create order
  static async createOrder(orderData) {
    const order = new Order(orderData);
    await order.save();
    return order;
  }
  //4. Update order
  static async updateOrder(orderId, updateData) {
    const order = await Order.findById(orderId);
    if (!order) return Promise.reject({ message: "Order not found" });

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach((key) => {
      if (key !== "_id") {
        order[key] = updateData[key];
      }
    });

    const updatedOrder = await order.save();
    return updatedOrder;
  }
  //5. Delete dish
  static async deleteOrder(orderId) {
    await Order.findByIdAndDelete(orderId);
  }
  //6. Update dish property in order model
  static async updateDishes(orderId, dishIds) {
    const order = await this.getOrderById(orderId);
    order.dish = dishIds;
    order.dish.forEach(async (dishId) => {
      await this.updateDish(dishId, { order: order._id });
    });
    await order.save();
    return order;
  }
}

module.exports = OrderService;
