import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/cartApi";
import { Link } from "react-router-dom";

export default function Cart({ token }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        let backendCart = [];
        if (token) {
          const data = await getCart(token);
          backendCart = data.items.map((item) => ({
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
            source: "db",
          }));
        }

        let localCart = JSON.parse(localStorage.getItem("localCart")) || [];
        localCart = localCart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity || 1,
          source: "local",
        }));

        setCartItems([...localCart, ...backendCart]);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  if (loading) return <p className="p-6">Loading...</p>;

  // Quantity update button
  const updateQuantity = (index, change) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + change;
      if (newQty > 0) {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  // 🟢 Remove from cart (local + backend)
  const handleRemove = async (item, index) => {
    try {
      if (item.source === "db" && token) {
        await removeFromCart(item._id, token);
      } else {
        // Local cart removal
        let localCart = JSON.parse(localStorage.getItem("localCart")) || [];
        localCart = localCart.filter((p) => p.id !== item.id);
        localStorage.setItem("localCart", JSON.stringify(localCart));
      }

      // Update UI
      setCartItems((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="section-title mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No items in cart</p>
      ) : (
        <div>
          {/* Items List */}
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="flex items-center border p-4 rounded-lg shadow-md bg-white justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shadow"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-blue-600 font-bold">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* Total per item */}
                <p className="font-bold w-20 text-right">
                  ₹{item.price * item.quantity}
                </p>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item, index)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-8 border-t pt-4">
            <p className="flex justify-between mb-2 text-lg">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between font-bold text-xl mb-4">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </p>

            <div className="flex flex-col space-y-3">
              <Link to="/checkout">
                <button className="btn btn-primary w-full">
                  Proceed to Checkout
                </button>
              </Link>
              <Link to="/">
                <button className="btn w-full bg-gray-200 hover:bg-gray-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
