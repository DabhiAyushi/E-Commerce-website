import React, { useState, useEffect } from "react";
import { getProducts, addToCart } from "../api/api";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
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
      } catch (error) {
        console.error("❌ Failed to add to cart:", error.response?.data || error.message);
      }
    }, 100);
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10">
        <ProductForm onAddProduct={fetchProducts} />
        <ProductList products={products} onDeleteProduct={fetchProducts} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductsPage;
