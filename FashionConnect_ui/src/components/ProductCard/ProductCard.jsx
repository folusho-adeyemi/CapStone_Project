import "./ProductCard.css";
import React, { useState } from "react";
import AddToCollectionsPopup from "../AddToCollectionsPopup/AddToCollectionsPopup";

export default function ProductCard({ product, userId }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleAddItemsToCollection = () =>
        setShowPopup(true);


    return (
        <div className="products-container">
            <div className="product" key={product.ProductID}>
                <img src={product.Image_URL} alt={product.Name} className="product-image" />
                <div className="product-name"><h3>{product.Name}</h3></div>
                <div className="product-price"><p className="price">{product.Price}</p></div>
                <button className="add-to-collections"
                    onClick={handleAddItemsToCollection}>
                    <h3>+</h3>
                </button>
            </div>
            {showPopup &&
                <AddToCollectionsPopup productID={product.ProductID} userId={userId} onClose={() => setShowPopup(false)} />
            }
        </div>
    )
};