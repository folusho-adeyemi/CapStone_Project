import "./Main.css"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";

function Main() {
    const { user, updateUser } = useContext(UserContext);
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }, []);

    const handleLogout = () => {
      // Perform logout logic here
      // Example: Clear user data from localStorage, reset user state, etc.
      updateUser(null);
    };
  
    return (
      <div className="main">
      <header className="header">
        <div className="user-info">
          {user ? (
            <>
              <span>Hi {user.username}! |</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <div className="products-container">
        {products.map((product) => (
          <div className="product" key={product.ProductID}>
            <img src={product.Image_URL} alt={product.Name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.Description}</p>
            <p className="product-price">{product.Price}</p>
          </div>
        ))}
      </div>
      </div>
    )
}

export default Main;