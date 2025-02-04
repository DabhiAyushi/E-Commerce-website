import React, { useState, useEffect } from "react";
import { getProducts, addProduct, deleteProduct, getCart, addToCart, removeFromCart } from "../api/api";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import Cart from "../components/Cart";

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
      <div className="container mx-auto py-10">
        <ProductForm onAddProduct={fetchProducts} />
        <ProductList
          products={products}
          onDeleteProduct={fetchProducts}
          onAddToCart={fetchCart}
        />
        <Cart cart={cart} onRemoveFromCart={fetchCart} />
      </div>
    </div>
  );
};

export default Home;
