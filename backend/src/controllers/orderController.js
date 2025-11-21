const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingAddress, items: allItems } = req.body;

    let orderItems = [];
    let totalAmount = 0;

    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (cart && cart.items.length > 0) {
      cart.items.forEach((i) => {
        orderItems.push({
          product: i.product._id,
          name: i.product.name,
          price: i.product.price,
          image: i.product.image,
          quantity: i.quantity,
        });
        totalAmount += i.product.price * i.quantity;
      });
    }

    // Dummy items (products.js se aaye)
    if (allItems && allItems.length > 0) {
      allItems.forEach((item) => {
        orderItems.push({
          product: item._id || item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        });
        totalAmount += item.price * item.quantity;
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Save order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    await order.save();

    // Clear backend cart
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
