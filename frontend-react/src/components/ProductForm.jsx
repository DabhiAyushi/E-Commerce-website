import React, { useState } from "react";
import { addProduct } from "../api/api";

const ProductForm = ({ onAddProduct }) => {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [errors, setErrors] = useState({ name: false, price: false, image: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let newErrors = {
      name: !form.name.trim(),
      price: !form.price.trim() || isNaN(form.price) || form.price <= 0,
      image: !form.image.trim(),
    };

    setErrors(newErrors);

    // If there are errors, return early
    if (Object.values(newErrors).some((error) => error)) return;

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
          className={`p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.name ? "bg-red-500 ring-red-500" : "bg-gray-500 focus:ring-blue-500"
          } text-white`}
        />
        {errors.name && <p className="text-red-500 text-sm">Product name is required</p>}

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className={`p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.price ? "bg-red-500 ring-red-500" : "bg-gray-500 focus:ring-blue-500"
          } text-white`}
        />
        {errors.price && <p className="text-red-500 text-sm">Enter a valid price</p>}

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className={`p-3 rounded-md focus:outline-none focus:ring-2 ${
            errors.image ? "bg-red-500 ring-red-500" : "bg-gray-500 focus:ring-blue-500"
          } text-white`}
        />
        {errors.image && <p className="text-red-500 text-sm">Image URL is required</p>}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
