
const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders } = require("../controllers/orderController");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

const Order = require("../models/Order");

// Customer: place order
router.post("/", verifyUser, placeOrder);

// Customer: get own orders
router.get("/myorders", verifyUser, getMyOrders);

// Admin: get all orders
router.get("/all", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Admin: update order status
router.put("/:id/status", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
