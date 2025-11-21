import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import productsData from "../data/products"; 
import categoryData from "../data/categoryData";  

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // "low-high" / "high-low"

  useEffect(() => {

    const allProducts = [...productsData, ...categoryData];


    const filtered = allProducts.filter(
      (p) => (p.category || "").toLowerCase() === categoryName.toLowerCase()
    );

    setProducts(filtered);
  }, [categoryName]);

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sorted = [...products];
    if (order === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setProducts(sorted);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{categoryName} Products</h1>

      {/* Sort Dropdown */}
      <div className="mb-6">
        <select
          value={sortOrder}
          onChange={handleSort}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="card shadow-lg p-4">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{p.name}</h2>
              <p className="text-blue-600 font-bold">₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
