const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyUser } = require("../middleware/auth");

// GET cart
// router.get("/", verifyUser, cartController.getCart);

// // POST add to cart
// router.post("/add", verifyUser, cartController.addToCart);

// //  PUT update quantity
// router.put("/update", verifyUser, cartController.updateQuantity);

// // DELETE remove item
// router.delete("/remove", verifyUser, cartController.removeFromCart);

router.get("/", verifyUser, cartController.getCart);
router.post("/", verifyUser, cartController.addToCart);
router.put("/", verifyUser, cartController.updateQuantity);
router.delete("/", verifyUser, cartController.removeFromCart);

module.exports = router;
