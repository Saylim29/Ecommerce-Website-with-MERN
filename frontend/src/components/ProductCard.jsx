import React from "react";
import { addToCart } from "../api/cartApi";

const ProductCard = ({ product, token }) => {
  const role = localStorage.getItem("role");

  const handleAddToCart = async () => {
    if (role === "admin") return; // Admin cart me add nhi kr skta

    try {
      await addToCart(
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
        token
      );
      alert("Item added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-700">₹{product.price}</p>

      {/* Only for customer */}
      {role !== "admin" && (
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
