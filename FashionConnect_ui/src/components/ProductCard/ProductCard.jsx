import "./ProductCard.css";
import React, { useState } from "react";
import AddToCollectionsPopup from "../AddToCollectionsPopup/AddToCollectionsPopup";

export default function ProductCard({ product, userId }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleAddItemsToCollection = () =>
        setShowPopup(true);


return(
        <div className="products-container" key={product.ProductID}>
          <div className="product-image-container">
            <img className="product-image" src={product.Image_URL} alt={product.Name} />
            <div className="add-to-collections-popup">
              <button className="add-to-collections button" onClick={handleAddItemsToCollection}>
                <h3>+</h3>
              </button>
              {showPopup && (
                <AddToCollectionsPopup productID={product.ProductID} userId={userId} onClose={() => setShowPopup(false)} />
              )}
            </div>
          </div>
          <div className="product-info">
            <div className="product-name"><h3>{product.Name}</h3></div>
            <div className="product-brand"><h4>{product.BrandName}</h4></div>
            <div className="product-price"><p className="price">$ {product.Price}</p></div>
          </div>
        </div>
      );
}