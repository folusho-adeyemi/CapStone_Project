import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionView from '../CollectionView/CollectionView';
import './Collections.css';

export default function Collections({ collections, products, setCollections }) {

    const handleDeleteProduct = async (collectionID, productID) => {
        console.log(collectionID, "i am product", productID)
        try {
            // Send a request to the backend to delete the product from the collection
            const response = await fetch(`http://localhost:3000/collections/${collectionID}/products/${productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.ok) {
                // If the deletion is successful, update the collections state
                setCollections((prevCollections) => prevCollections.map((collection) =>
                    collection.CollectionID === collectionID
                        ? { ...collection, ProductID: collection.ProductID.filter((id) => id !== productID) }
                        : collection
                ));
            } else {
                console.error('Failed to delete product from the collection');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="header">
            <h2 className='collection-header'>Collections</h2>
            <div className="collections-list">
                {collections.length === 0 ? (
                    <p className="no-collections">No collections found.</p>
                ) : (
                    collections.map((collection) => (
                        <div className="collection" key={collection.CollectionID}>
                            <h3 className='collection-name'>{collection.Name}</h3>
                            <p className='collection-description'>{collection.Description}</p>
                            <div className="products">
                                {products
                                    .filter((product) => collection.ProductID.includes(product.ProductID))
                                    .map((product) => (
                                        <CollectionView
                                            key={product.ProductID}
                                            product={product}
                                            handleDeleteProduct={() => handleDeleteProduct(collection.CollectionID, product.ProductID)} />
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Link to="/">Go Home</Link>
        </div>
    );
}
