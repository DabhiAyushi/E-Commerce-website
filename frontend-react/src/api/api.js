import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(`${BASE_URL}/products`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

export const addToCart = async (id) => {
  const response = await axios.post(`${BASE_URL}/cart`, { product_id: id });
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${BASE_URL}/cart/${id}`);
  return response.data;
};
