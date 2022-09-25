const mongoose = require("mongoose");

//schema definition
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide user id"],
    unique: true,
  },
  basketId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide basket id"],
    unique: true,
  },
  deliveryId: {
    type: mongoose.Types.ObjectId,
    required:false,
    unique: true,
  },
  tiffinId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide tiffin id"],
    unique: true,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    required: false,
    default: "NEW",
    enum: [
      "NEW",
      "COOKING",
      "ACCEPTED",
      "READY_TO_PICK",
      "PICKED_UP",
      "COMPLETED",
    ],
  },
  deliveryFee:{
    type:Number,
    required:[true,'Please provide delivery fee']
  }
});

module.exports = mongoose.model("Order", orderSchema);
