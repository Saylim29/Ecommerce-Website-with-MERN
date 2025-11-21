import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 text-white py-10 mt-16 rounded-t-2xl shadow-lg">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Tagline */}
        <div>
          <h2 className="text-2xl font-bold mb-2 tracking-wide">PrimeGadgets</h2>
          <p className="text-blue-100 mb-4">Your one-stop shop for the latest electronics & gadgets.</p>
          <p className="text-xs text-blue-200">&copy; {new Date().getFullYear()}PrimeGadgets. All rights reserved.</p>
        </div>
        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3 text-blue-200">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-300 transition">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-blue-300 transition">Cart</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
            </li>
            <li>
              <Link to="/#products" className="hover:text-blue-300 transition">Products</Link>
            </li>
          </ul>
        </div>
        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-3 text-blue-200">Contact</h3>
          <p className="text-blue-100">Email: <a href="mailto:support@primegadgets.com" className="underline hover:text-blue-300">support@primegadgets.com</a></p>
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 text-xl">
              <i className="fab fa-twitter"></i>🐦
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 text-xl">
              <i className="fab fa-instagram"></i>📸
            </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 text-xl">
                      <i className="fab fa-facebook"></i>📘
                    </a>
                  </div>
                </div>
              </div>
            </footer>
  )};

  export default Footer;