import "./Main.css"
import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import Products from "../Products/Products";

export default function Main({ collections, setCollections }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="main">
      <NavBar />
      <Products products={products} collections={collections} setCollections={setCollections} />

    </div>
  )
}

