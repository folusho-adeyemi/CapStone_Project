import "./CreateCollection.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function CreateCollection({ userId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a POST request to create a new collection
    const response = await fetch('https://fashionconnectapi.onrender.com/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, userId }),
    });

    if (response.ok) {
      setName('');
      setDescription('');
      navigate("/")
    } else {
      throw error('Failed to create collection');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Collection Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit" className="collection-button">Create Collection</button>
      <Link to="/">Cancel</Link>
    </form>
  );
}