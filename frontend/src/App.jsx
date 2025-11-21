import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductsGrid from "./components/ProductsGrid";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import CategoryPage from "./pages/CategoryPage";
import AllProducts from "./pages/AllProducts";
import PaymentSuccess from "./pages/PaymentSuccess";


// Admin Components
import AdminDashboard from "./components/AdminDashboard";
import ProductListAdmin from "./components/ProductListAdmin";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import OrderListAdmin from "./components/OrderListAdmin";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Categories />
                  <section className="max-w-7xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
                    <ProductsGrid />
                  </section>
                </>
              }
            />

            {/* Customer Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout token={token} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/myorders" element={<MyOrders token={token} />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />



            {/* Admin Routes */}
            {token && role === "admin" && (
              <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductListAdmin />} />
                <Route path="/admin/products/new" element={<AddProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
                <Route path="/admin/orders" element={<OrderListAdmin />} />
              </>
            )}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
