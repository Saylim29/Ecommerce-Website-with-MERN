import axios from "axios";

const CART_API_URL = "http://localhost:5000/api/cart";
const ORDER_API_URL = "http://localhost:5000/api/orders";

// Add product to cart
export const addToCart = async (product, token) => {
  const res = await axios.post(
    "http://localhost:5000/api/cart",
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};


// Get user cart
export const getCart = async (token) => {
  const res = await axios.get(CART_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Remove product from cart
export const removeFromCart = async (productId, token) => {
  const res = await axios.delete(CART_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    data: { productId },
  });
  return res.data;
};

// Place Order
export const placeOrder = async ({ paymentMethod, shippingAddress, items }, token) => {
  const res = await axios.post(
    ORDER_API_URL,
    { paymentMethod, shippingAddress, items },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  console.log("Order Saved to DB:", res.data);
  return res.data;
};
