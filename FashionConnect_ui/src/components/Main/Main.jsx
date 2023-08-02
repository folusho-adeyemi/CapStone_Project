import "./Main.css"
import NavBar from "../NavBar/NavBar";
import Products from "../Products/Products";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import video from "../../assets/video.mp4";
import Footer from "../Footer/Footer";

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
    // Programmatically play the video when the component mounts
    const videoElement = document.getElementById("videoPlayer");
    if (videoElement) {
      videoElement.play().catch((error) => {
        // Autoplay was prevented by the browser; handle the error if needed
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <div className="main-view">
      <NavBar />
      <div className="video-container">
        {/* Your video component here */}
        <video
          id="videoPlayer"
          width="100%"
          height="100%"
          autoPlay // Set to true to enable autoplay
          muted // Add the muted attribute to allow autoplay on desktop browsers
          loop 
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <Products products={products} userId={userId} />
      <button onClick={loadMoreProducts}>Load Products</button>
      <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=Hello%20world">
        Tweet</a>
      <Footer />
    </div>
  );
};
