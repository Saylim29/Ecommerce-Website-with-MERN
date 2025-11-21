import React from "react";
import productsData from "../data/products";

export default function AllProducts() {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData.map((item) => (
          <div key={item.id} className="shadow p-4 rounded bg-white">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="font-semibold mt-2">{item.name}</h2>
            <p className="text-blue-600 font-bold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
