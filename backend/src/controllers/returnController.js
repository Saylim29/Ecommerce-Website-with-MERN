const ReturnRequest = require("../models/ReturnRequest");

// Create return request
exports.createReturn = async (req, res) => {
  try {
    const returnRequest = new ReturnRequest({
      user: req.user.id,
      product: req.body.product,
      reason: req.body.reason,
    });
    await returnRequest.save();
    res.status(201).json(returnRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get karo user return requests
exports.getUserReturns = async (req, res) => {
  try {
    const returns = await ReturnRequest.find({ user: req.user.id }).populate("product");
    res.json(returns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
