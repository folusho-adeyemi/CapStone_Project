import "./CollectionView.css";
import React from "react";
import ShareButton from "../../ShareButton/ShareButton";

export default function CollectionView({ product, handleDeleteProduct }) {
    const caption = "Checkout this item in my collection ${product.Name}";

    return (
        <div className="collections-container">
            <div className="collection" key={product.ProductID}>
                <img src={product.Image_URL} alt={product.Name} className="collection-image" />
                <div className="collection-name"><h3>{product.Name}</h3></div>
                <button className="button-collection" onClick={() => handleDeleteProduct(product.ProductID)}>Remove</button>
                <ShareButton imageUrl={product.Image_URL} />
            </div>
        </div>
    )
}