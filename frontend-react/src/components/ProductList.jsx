import React from "react";
import { deleteProduct, addToCart } from "../api/api";

const ProductList = ({ products, onDeleteProduct, onAddToCart }) => {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    onDeleteProduct();
  };

  const handleAddToCart = async (id) => {
    if (!id) {
      console.error("❌ Error: Product ID is undefined or null");
      return;
    }
  
    console.log(`⏳ Waiting 100ms before adding product ${id} to cart...`);
    
    setTimeout(async () => {
      try {
        await addToCart(id);
        console.log(`✅ Success: Product ${id} added to cart`);
        onAddToCart();
      } catch (error) {
        console.error("❌ Failed to add to cart:", error.response?.data || error.message);
      }
    }, 100);
  };
  

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold text-center mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-bold mt-4">{product.name}</h3>
            <p className="text-gray-400">Price: ${product.price}</p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
