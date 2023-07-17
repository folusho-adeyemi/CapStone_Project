import "./Products.css"
import React, { useState} from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function Products({products}){
   
    const [searched, setSearched] = useState("");
    const regexp = new RegExp(searched, "i");
    const [clickedCategory, setClickedCategory] = useState("");

    const handleClick = (category) => {
      setClickedCategory(category);
    };
  
    const handleSearched = (event) => {
      const searched = event.target.value;
      setSearched(searched);
    };
  
    let currProds = clickedCategory ? products.filter((product) => product.category.Name === clickedCategory):products
    let currSearch = currProds.filter((product) => regexp.test(product.Name));
  
    return (
      <section className="products">
         <div className="search-comp">
            <form className= "search-text-input" method="get-search-input" onChange={(event) => handleSearched(event)}>
                        <input className="search-text" type="text" required />
                    <div className="button" id="s-cover">
                        <button className="search" type="submit">SEARCH
                        </button>
                </div>
            </form>
        </div>
        <div className="menu">
            <li>
            <button className="menu-btn" onClick={() => handleClick("")}>
                All Categories
            </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => handleClick("Tops")}>
                Tops
            </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => handleClick("Dresses")}>
                Dresses
            </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => handleClick("Accessories")}>
                Accessories
            </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => handleClick("Bags")}>
                Bags
            </button>
            </li>
            <li>
            <button className="menu-btn" onClick={() => handleClick("Shoes")}>
                Shoes
            </button>
            </li>
        </div>

        <div className="products-grid">
          {searched === "" && clickedCategory !== "" ? (
            currProds.map((product,idx) => (
              <ProductCard
              product={product}
                productId={product.ProductID}
                key={idx}
              />
            ))
          ) : searched === "" && clickedCategory === "" ? (
            products.map((product, idx) => (
              <ProductCard
                product={product}
                productId={product.ProductID}
                key={idx}
              />
            ))
          ) : (currSearch.map((product, idx) => (
            <ProductCard
              product={product}
              productId={product.ProductID}
              key={idx}
            />
          )))}
        </div>
      </section>
    );
  }
  