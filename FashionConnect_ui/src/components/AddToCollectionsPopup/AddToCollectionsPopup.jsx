import { Link } from "react-router-dom";
import "./AddToCollectionsPopup.css";
import React, { useState, useEffect } from "react";



export default function AddToCollectionsPopup({ productID, userId, onClose }) {

  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const user_collections = await fetch(`http://localhost:3000/collections/${userId}`);
        const data = await user_collections.json();
        setCollections(data);
      } catch (error) {
        throw error;
      }
    };

    fetchCollections();
  }, [userId]);

  const [selectedCollections, setSelectedCollections] = useState([]);

  const handleCollectionChange = (event, collectionID) => {
    if (event.target.checked) {
      setSelectedCollections((prevSelected) => [...prevSelected, collectionID]);
    } else {
      setSelectedCollections((prevSelected) =>
        prevSelected.filter((id) => id !== collectionID)
      );
    }
  };

  const handleAddToCollection = () => {
    // To Update the collections with the new ProductID
    const updatedCollections = collections.map((collection) => {
      if (selectedCollections.includes(collection.CollectionID)) {
        const productIDExists = collection.ProductID.includes(productID);

        // If the productID does not exist in the collection's ProductID array, add it
        if (!productIDExists) {
          return {
            ...collection,
            ProductID: [...collection.ProductID, productID],
          };
        }
      }
      return collection;
    });

    // To convert the productid's to integer
    updatedCollections.forEach((collection) => {
      collection.ProductID = collection.ProductID.map(Number);
    });


    const saveUpdatedCollectionsToDatabase = async (updatedCollections) => {

      try {
        const response = await fetch('http://localhost:3000/update-collections', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCollections),
        });

        if (!response.ok) {
          throw new Error('Failed to update collections in the database');
        }
      } catch (error) {
        throw error;

      }
    };

    // To Call a function to save the updated collections to the database
    saveUpdatedCollectionsToDatabase(updatedCollections);

    // To Close the popup
    onClose();
  };

  return (
    <div className="add-to-collection-popup">
      <h2>Select Collections to Add Product</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.CollectionID}>
            <label>
              <input
                type="checkbox"
                checked={selectedCollections.includes(collection.CollectionID)}
                onChange={(event) =>
                  handleCollectionChange(event, collection.CollectionID)
                }
              />
              <h3 className="collection-name">{collection.Name}</h3>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddToCollection}>Add to Collection</button>
      <Link to="/newcollection">Create a New Collection</Link>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

