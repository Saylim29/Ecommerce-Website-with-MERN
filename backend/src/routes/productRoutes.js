const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { verifyUser, verifyAdmin } = require("../middleware/auth");

// --- Storage setup (cloudinary/disk) ---
let upload;
if (
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_SECRET
) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "products",
      allowed_formats: ["jpg", "jpeg", "png"],
    },
  });
  upload = multer({ storage });
} else {
  const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
    },
  });
  upload = multer({ storage: diskStorage });
}

// ---------- Get all products ----------
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------- Get single product ----------
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------- Add new product ----------
router.post("/", verifyUser, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    if (!name || !price || !category || stock === undefined) {
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
      price: Number(price),        
      category,
      stock: Number(stock),          
      description,
      image: imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------- Update product ----------
router.put("/:id", verifyUser, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, category, stock, description } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (category !== undefined) product.category = category;
    if (stock !== undefined) product.stock = Number(stock);
    if (description !== undefined) product.description = description;

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
});

// ---------- Delete product ----------
router.delete("/:id", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
