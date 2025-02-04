import React from "react";
import { removeFromCart } from "../api/api";

const Cart = ({ cart, onRemoveFromCart }) => {
  const handleRemove = async (id) => {
    await removeFromCart(id);
    onRemoveFromCart();
  };

  return (
    <div className="my-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-white mb-6">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-400">No items in the cart.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b border-gray-600"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400">${item.price}</p>
              </div>
              <button
                className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
