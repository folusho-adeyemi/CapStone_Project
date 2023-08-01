import { Link } from "react-router-dom";
import "./AddToCollectionsPopup.css";
import React, {useState} from "react";



export default function AddToCollectionsPopup({ collections, productID, onClose }){

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

     // To Update the collections with the new ProductID
    const handleAddToCollection = () => {
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
            return collection;;
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
          
        //Save the updated collections to the database
        saveUpdatedCollectionsToDatabase(updatedCollections);
    
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
    
