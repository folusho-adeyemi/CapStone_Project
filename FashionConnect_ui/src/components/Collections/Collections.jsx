import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionView from '../CollectionView/CollectionView';
import './Collections.css';
import { useNavigate } from 'react-router-dom';

export default function Collections({ userId }) {
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const user_collections = await fetch(`https://fashion-connect-gwt7.vercel.app/collections/${userId}`);
                const data = await user_collections.json();
                setCollections(data);
            } catch (error) {
                throw error;
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
            const diff_products = await fetch(`https://fashion-connect-gwt7.vercel.app/products/${productId}`);
            const product = await diff_products.json();
            return product;
        } catch (error) {
            return null;
        }
    };
    const navigate = useNavigate();

    const getUniqueProducts = (productArray) => {
        const uniqueProducts = [];
        const productIDs = new Set();

        for (const product of productArray) {
            if (!productIDs.has(product.ProductID)) {
                uniqueProducts.push(product);
                productIDs.add(product.ProductID);
            }
        }

        return uniqueProducts;
    };

    // Remove duplicates from the products array based on ProductID
    const uniqueProductsArray = getUniqueProducts(products);

    const handleDeleteProduct = async (collectionID, productID) => {

        try {
            // Send a request to the backend to delete the product from the collection
            const response = await fetch(`https://fashion-connect-gwt7.vercel.app/collections/${collectionID}/products/${productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the deletion is successful, update the collections state
                setCollections((prevCollections) => prevCollections.map((collection) =>
                    collection.CollectionID === collectionID
                        ? { ...collection, ProductID: collection.ProductID.filter((id) => id !== productID) }
                        : collection
                ));
            } else {
                throw error('Failed to delete product from the collection');
            }
        } catch (error) {
            throw error
        }
    };

    const handleDeleteCollection = async (collectionID) => {

        try {
            // Send a request to the backend to delete the product from the collection
            const response = await fetch(`https://fashion-connect-gwt7.vercel.app/collections/${collectionID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate("/")
            }
        } catch (error) {
            throw error
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
                                {uniqueProductsArray
                                    .filter((product) => collection.ProductID.includes(product.ProductID))
                                    .map((product) => (
                                        <CollectionView
                                            key={product.ProductID}
                                            product={product}
                                            handleDeleteProduct={() => handleDeleteProduct(collection.CollectionID, product.ProductID)} />
                                    ))}
                            </div>
                            <button onClick={() => { handleDeleteCollection(collection.CollectionID) }}>Delete Collection</button>
                        </div>
                    ))
                )}
            </div>
            <Link to="/">Go Home</Link>
        </div>
    );
}
