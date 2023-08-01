import "./Main.css"
import NavBar from "../NavBar/NavBar";
import Products from "../Products/Products";
import React, { useState } from 'react';
import axios from 'axios';

export default function Main({ userId }) {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/products?page=${page}&pageSize=${pageSize}`);
      const data = response.data;
      return data;

    } catch (error) {
      throw error;
    }
  };

  const loadMoreProducts = async () => {
    const nextPage = currentPage + 1;
    const newProducts = await fetchProducts(nextPage);

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setCurrentPage(nextPage);
  };

  return (
    <div>
      <NavBar />
      <Products products={products} userId={userId} />
      <button onClick={loadMoreProducts}>Load Products</button>
    </div>
  );
};
