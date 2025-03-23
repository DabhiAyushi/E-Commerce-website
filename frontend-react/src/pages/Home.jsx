import React, { useState, useEffect } from "react";
import { getProducts, getCart } from "../api/api";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const fetchCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar cartItemCount={cart.length} />
      
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0070/7032/articles/product_2520development-1.png?v=1732218782&originalWidth=1848&originalHeight=782&width=1800')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
          <p className="mt-2 text-lg">Discover the best products at unbeatable prices!</p>
        </div>
      </div>
      
      <div className="container mx-auto py-10">
        <ProductList
          products={products}
          onDeleteProduct={fetchProducts}
          onAddToCart={fetchCart}
        />
      </div>
    </div>
  );
};

export default Home;
