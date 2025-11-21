import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow">
      <Link to="/" className="text-xl font-bold">
        PrimeGadgets
      </Link>

      {/* Center Menu */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        {token && (
          <Link to="/cart" className="hover:text-blue-400">Cart</Link>
        )}
      </div>

      {/* Right Menu */}
      <div>
        {!token ? (
          <Link to="/login" className="hover:text-blue-400 font-semibold">
            Login / Signup
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="font-semibold hover:text-blue-300"
            >
              {name} ▾
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded p-2 w-28">
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
