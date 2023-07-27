import "./Main.css"
import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import Products from "../Products/Products";

export default function Main({ collections, setCollections }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30; 
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      throw error;
    }
  };
  

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      const response = await fetch(
        `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${currentPage}&pagesize=${pageSize}`,
        {
          headers: {
            'X-RapidAPI-Key': '4ecf7b02f6mshe1fb9d190d9f5f0p1dc11cjsn12e4e06a025c',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();

      if (data.results.length === 0) {
        // No more products to fetch, stop pagination
        return;
      }

      // Map the API response to match the database schema
      const mappedProducts = data.results.map((result) => ({

        Name: result.name,
        Price: result.price?.value || 0, 
        Image_URL: result.images[0]?.url || null, 
        CategoryName: result.categoryName,
        BrandName: result.brandName,
      }));

      setProducts((prevProducts) => [...prevProducts, ...mappedProducts]);
      setCurrentPage((prevPage) => prevPage + 1);

      // Send the new products to the backend for storage
      await sendNewProductsToBackend(mappedProducts);
    } catch (error) {
      throw error;
    } 
  };

  const sendNewProductsToBackend = async (newProducts) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProducts),
      });

      if (!response.ok) {
        throw error;
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <div className="main">
      <NavBar />
      <Products products={products} collections={collections} setCollections={setCollections} />
      <button onClick={fetchNewProducts}>Load More</button>
    </div>
  );
}