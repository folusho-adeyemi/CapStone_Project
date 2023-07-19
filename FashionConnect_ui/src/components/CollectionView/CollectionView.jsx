import "./CollectionView.css";
import React from "react";

export default function CollectionView({product}) {

    return (
        <div className="products-container">
            <div className="product" key={product.ProductID}>
                <img src={product.Image_URL} alt={product.Name} className="product-image" />
                <div className="product-name"><h3>{product.Name}</h3></div>
                {/* <div className="product-description"><p className="description">{product.Description}</p></div> */}
                <div className="product-price"><p className="price">{product.Price}</p></div>
            </div>
        </div>
    )
}