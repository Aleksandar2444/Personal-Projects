const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  dish: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
  status: {
    type: String,
    minlength: 2,
    required: true,
    enum: ["new", "cancelled", "done"],
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
