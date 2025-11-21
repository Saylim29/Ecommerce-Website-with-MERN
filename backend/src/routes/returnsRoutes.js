const express = require("express");
const ReturnRequest = require("../models/ReturnRequest");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

// User Create a return request
router.post("/", verifyUser, async (req, res) => {
  try {
    const { product, reason } = req.body;
    const request = await ReturnRequest.create({
      user: req.user.id,
      product,
      reason,
    });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Approve or Reject karega
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body; // "Approved" or "Rejected"
    const updated = await ReturnRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
