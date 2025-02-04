import React, { useState } from "react";
import { addProduct } from "../api/api";

const ProductForm = ({ onAddProduct }) => {
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(form);
    setForm({ name: "", price: "", image: "" });
    onAddProduct();
  };

  return (
    <div className="my-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-white mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
