
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import productsData from "../data/products"; // dummy products.js se

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // DB se products
        const res = await axios.get("http://localhost:5000/api/products");
        
        // Dummy aur DB ke products merge karna
        const mergedProducts = [...productsData, ...res.data];
        setProducts(mergedProducts);
      } catch (err) {
        console.error("Error fetching products", err);
        // Agar db down hai to sirf dummy show ho
        setProducts(productsData);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id || product.id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-blue-600 font-bold">₹{product.price}</p>

            <Link to={`/product/${product._id || product.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
