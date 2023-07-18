import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import './Collections.css';

export default function Collections({ userId }) {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const user_collections = await fetch(`http://localhost:3000/collections/${userId}`);
                const data = await user_collections.json();
                setCollections(data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, [userId]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productPromises = collections.flatMap((collection) =>
                collection.ProductID.map((productId) => fetchProductDetails(productId))
            );
            const finalProducts = await Promise.all(productPromises);
            setProducts(finalProducts);
        };

        fetchProducts();
    }, [collections]);

    const fetchProductDetails = async (productId) => {
        try {
            const diff_products = await fetch(`http://localhost:3000/products/${productId}`);
            const product = await diff_products.json();
            return product;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
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
                                        <ProductCard key={product.ProductID} product={product} />
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
