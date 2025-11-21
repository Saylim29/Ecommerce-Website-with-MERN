import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, placeOrder as placeOrderApi } from "../api/cartApi"; // cartApi.js me updated placeOrder

export default function Checkout({ token }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ----------------- FETCH CART (backend + localStorage) -----------------
  const fetchCartData = async () => {
    let mergedItems = [];

    // Backend cart
    if (token) {
      try {
        const data = await getCart(token);
        if (data && data.items && data.items.length > 0) {
          mergedItems = [
            ...mergedItems,
            ...data.items.map(item => ({
              _id: item.product._id,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
              quantity: item.quantity
            }))
          ];
        }
      } catch (err) {
        console.error("Backend cart fetch failed:", err);
      }
    }

    // LocalStorage cart (dummy products)
    const localCart = JSON.parse(localStorage.getItem("localCart")) || [];
    if (localCart.length > 0) {
      mergedItems = [
        ...mergedItems,
        ...localCart.map(item => ({
          _id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        }))
      ];
    }

    setCart({ items: mergedItems });
    const total = mergedItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    setSubtotal(total);
  };

  useEffect(() => {
    fetchCartData();
  }, [token]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  // ----------------- PLACE ORDER -----------------
  const handlePlaceOrder = async () => {
  if (!shippingAddress.fullName || !shippingAddress.address) {
    alert("Please fill in shipping details");
    return;
  }

  try {
    const order = await placeOrderApi(
      {
        paymentMethod,
        shippingAddress,
        items: cart.items 
      },
      token
    );

    alert("Order placed successfully!");
    console.log("Order Details:", order);

    localStorage.removeItem("localCart");

    fetchCartData();

    navigate("/payment-success");
  } catch (err) {
    console.error("Failed to place order:", err);
    alert("Failed to place order");
  }
};

  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="section-title mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Shipping Address */}
        <div className="card">
          <h2 className="font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-3">
            <input type="text" name="fullName" value={shippingAddress.fullName} onChange={handleChange} placeholder="Full Name" className="input w-full" />
            <input type="text" name="address" value={shippingAddress.address} onChange={handleChange} placeholder="Address" className="input w-full" />
            <input type="text" name="city" value={shippingAddress.city} onChange={handleChange} placeholder="City" className="input w-full" />
            <input type="text" name="pincode" value={shippingAddress.pincode} onChange={handleChange} placeholder="Pincode" className="input w-full" />
          </form>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          {cart.items.map((item, idx) => (
            <div key={idx} className="flex items-center border p-3 rounded img-shadow bg-gray-50 mb-3">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded img-shadow" />
              <div className="ml-4">
                <p>{item.name}</p>
                <p className="font-semibold">₹{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="mt-4 space-y-2">
            <p className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></p>
            <p className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{subtotal}</span></p>
          </div>

          {/* Payment Option */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <label className="flex items-center space-x-2">
              <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          <button onClick={handlePlaceOrder} className="btn btn-primary w-full mt-6">Place Order</button>
        </div>

      </div>
    </div>
  );
}
