import "./Main.css"
import NavBar from "../NavBar/NavBar";
import { useState ,useEffect } from "react";
import Products from "../Products/Products";

export default function Main() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
      <div className="main">
        <NavBar />
        <Products products={products}/>       
      </div>
    )
}

