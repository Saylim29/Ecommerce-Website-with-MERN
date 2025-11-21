const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------- Add product (Admin only) ----------
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;

    if (!name || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = "";
    if (req.file) {
      if (req.file.path && String(req.file.path).startsWith("http")) {
        imageUrl = req.file.path;
      } else if (req.file.secure_url) {
        imageUrl = req.file.secure_url;
      } else {
        imageUrl = "/uploads/" + req.file.filename;
      }
    }

    const product = new Product({
      name,
      price,
      category,
      stock,
      description,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------- Update product (Admin only) ----------
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, category, stock, description } = req.body;

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.description = description ?? product.description;

    if (req.file) {
      if (req.file.path && String(req.file.path).startsWith("http")) {
        product.image = req.file.path;
      } else if (req.file.secure_url) {
        product.image = req.file.secure_url;
      } else {
        product.image = "/uploads/" + req.file.filename;
      }
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------- Delete product (Admin only) ----------
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
