const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Use controller-based routes (clean + correct)
router.post("/signup", register);
router.post("/login", login);

module.exports = router;
