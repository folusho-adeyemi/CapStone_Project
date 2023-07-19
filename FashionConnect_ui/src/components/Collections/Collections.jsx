import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectionView from '../CollectionView/CollectionView';
import './Collections.css';

export default function Collections({collections, products}) {

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
                                        <CollectionView key={product.ProductID} product={product} />
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
