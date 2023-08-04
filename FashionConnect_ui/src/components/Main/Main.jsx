import "./Main.css"
import NavBar from "../NavBar/NavBar";
import Products from "../Products/Products";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import video from "../../assets/video.mp4";

export default function Main({ userId }) {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`https://fashionconnectapi.onrender.com/products?page=${page}&pageSize=${pageSize}`);
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
  useEffect(() => {
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="main-view">
      <NavBar />
      <div className="video-container">
        <video
          id="videoPlayer"
          width="100%"
          height="100%"
          autoPlay
          muted
          loop
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Products products={products} userId={userId} />
      <button className="load-button" onClick={loadMoreProducts}>Load Products</button>
    </div>
  );
};
