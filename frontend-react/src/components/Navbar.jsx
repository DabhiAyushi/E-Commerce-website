import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="bg-gray-800 p-2 shadow-lg">
      <div className="m-2 flex items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyShop
        </Link>

        {/* Navigation Links */}
        <div className="flex-grow flex justify-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          
        </div>

        {/* Cart Icon */}
        <div className="ml-auto">
          <Link to="/cart" className="relative text-white">
            <FiShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2 py-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
