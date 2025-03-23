import React, { useState, useEffect } from "react";
import { getCart } from "../api/api"; 
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar cartItemCount={cart.length} />
      <div className="container mx-auto py-10">
        <h2 className="text-2xl text-center mb-6">Your Shopping Cart</h2>
        <Cart cart={cart} onRemoveFromCart={fetchCart} />
      </div>
    </div>
  );
};

export default CartPage;
