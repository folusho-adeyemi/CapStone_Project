import "./Products.css"
import { useState, useEffect, useContext } from "react";

export default function Products(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
        };
        fetchProducts();
    }, []);
    return(
        <div className="main">
        <div className="products-container">
        {products.map((product) => (
          <div className="product" key={product.ProductID}>
            <img src={product.Image_URL} alt={product.Name} className="product-image" />
            <div className="product-name"><h3>{product.Name}</h3></div>
            {/* <div className="product-description"><p className="description">{product.Description}</p></div> */}
            <div className="product-price"><p className="price">{product.Price}</p></div>
          </div>
        ))}
      </div>
      </div>

)}