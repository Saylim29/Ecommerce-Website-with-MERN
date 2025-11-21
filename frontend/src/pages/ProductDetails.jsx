import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import productsData from "../data/products";
import { addToCart } from "../api/cartApi";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      // 1️⃣ FIRST: Check in local dummy data
      let found = productsData.find((p) => String(p.id) === String(id));
      if (found) {
        setProduct(found);
        setLoading(false);
        return;
      }

      // 2️⃣ ELSE: Fetch from backend MongoDB
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ---------------------- ADD TO CART ----------------------
  const handleAddToCart = async () => {
    if (role === "admin") {
      alert("Admin cannot add items to cart!");
      return;
    }

    if (!token) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    // For local dummy products
    if (!product._id && product.id) {
      let localCart = JSON.parse(localStorage.getItem("localCart")) || [];
      const exists = localCart.find((item) => item.id === product.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        localCart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("localCart", JSON.stringify(localCart));
      alert("Item added to cart");
      return;
    }

    // For MongoDB products
    try {
      await addToCart(product._id, 1, token);
      alert("Item added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add item to cart");
    }
  };

  // ---------------------- UI ----------------------
  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 card shadow-2xl bg-white/90 backdrop-blur-lg">

        {/* Left Section - Image */}
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-shadow w-full max-w-xs h-80 object-cover rounded-xl mb-4"
          />
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow mt-2">
            #{product.category || "Gadget"}
          </span>
        </div>

        {/* Right Section - Text */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2 text-blue-800">
            {product.name}
          </h1>

          <p className="text-2xl text-blue-600 font-bold mb-4">
            ₹{product.price}
          </p>

          <p className="mb-6 text-gray-700">
            {product.description ||
              "Experience the best quality and latest technology with this amazing gadget. Perfect for your lifestyle and needs."}
          </p>

          {/* Add to Cart (Only for Customers) */}
          {role !== "admin" && (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 hover:bg-blue-700 transition-all duration-200"
            >
              Add to Cart
            </button>
          )}

          {/* Go to Cart Button */}
          {role !== "admin" && (
            <button
              onClick={() => navigate("/cart")}
              className="btn btn-secondary px-8 py-3 mt-3 rounded-full shadow hover:scale-105 transition"
            >
              Go to Cart
            </button>
          )}

          {/* Product Details */}
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2 text-blue-700">
              Product Details
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>High quality & durable</li>
              <li>1-year warranty</li>
              <li>Fast delivery</li>
              <li>Easy returns</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
