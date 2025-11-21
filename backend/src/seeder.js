require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany([
      {
        name: "Samsung Galaxy M30s",
        price: 13999,
        image:
          "https://5.imimg.com/data5/TR/GT/EI/SELLER-83754626/samsung-galaxy-m30s.jpeg",
      },
      {
        name: "iPhone 14",
        price: 79999,
        image: "",
      },
      {
        name: "OnePlus Nord",
        price: 29999,
        image: "xyz",
      },
    ]);
    console.log("Products Seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
