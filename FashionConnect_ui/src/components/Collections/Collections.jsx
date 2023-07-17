import "./Collections.css"
import React, {useEffect, useState} from 'react';

export default function Collections(){
    
    const [collections, setCollections] = useState([]);

    useEffect(() =>{
      const fetchCollections = async (e) =>{
        try{
            const users_collection = await fetch(`http://localhost:3000/collections`);
            const data = await users_collection.json();
            setCollections(data);
          } catch (error) {
            console.error('Error fetching collections:', error);
          }
        };
    
        fetchCollections();
      }, []);

    return(
        <div className="header">
            <h2>Collections</h2>
            <div className="collections-list">
                {collections.map((collection) =>(
                    <div key={collection.CollectionID}>
                        <h3>{collection.Name}</h3>
                        <p>{collection.Description}</p>
                        </div>
                ))}
            </div>
        </div>
    );
}