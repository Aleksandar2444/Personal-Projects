const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 2,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 1,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: 2,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
