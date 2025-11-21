const ReturnRequest = require("../models/ReturnRequest");
const Product = require("../models/Product");

// Approve/Reject return request
exports.updateReturnStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await ReturnRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Return request not found" });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all return requests
exports.getAllReturns = async (req, res) => {
  try {
    const requests = await ReturnRequest.find().populate("user product");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View inventory
exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
