const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema); 