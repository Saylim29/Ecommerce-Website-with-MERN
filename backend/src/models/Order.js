
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
      
        product: { type: mongoose.Schema.Types.Mixed, required: true },
        name: { type: String },
        price: { type: Number },
        image: { type: String },
        quantity: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["COD", "ONLINE"], default: "COD" },

    
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Completed"],
      default: "Pending",
    },

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      pincode: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
