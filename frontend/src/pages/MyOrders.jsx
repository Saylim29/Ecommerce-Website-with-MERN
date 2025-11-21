import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderApi";
import { Link } from "react-router-dom";

export default function MyOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Please login to view your orders.</p>
        <Link to="/login" className="btn btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) return <p className="p-6 text-center">Loading your orders...</p>;

  if (!orders.length) return <p className="p-6 text-center">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card shadow-xl p-6 border rounded-lg hover:shadow-2xl transition"
          >
            <div className="mb-4">
              <p className="font-semibold">Order ID: {order._id}</p>
              <p>Status: <span className="font-medium text-green-600">{order.status}</span></p>
              <p>Payment: {order.paymentMethod}</p>
              <p className="font-semibold">Total: ₹{order.totalAmount}</p>
            </div>

            <div className="divide-y">
              {order.items.map((item) => {
                // yahan backend image URL ko handle kar rahe hain
                const imageUrl = item.product?.image?.startsWith("http")
                  ? item.product.image
                  : `http://localhost:5000${item.product?.image}`;

                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center">
                      <img
                        src={imageUrl}
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ₹{item.product?.price} × {item.quantity}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
