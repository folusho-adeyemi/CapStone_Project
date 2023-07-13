import React from "react";
import "./NavBar.css";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";


export default function NavBar(){
    const { user, updateUser } = useContext(UserContext);

    const handleLogout = () => {
        // Perform logout logic here
        // Example: Clear user data from localStorage, reset user state, etc.
        updateUser(null);
      };

    return(
        <div className="navbar">
        <div className="user-info">
          {user ? (
            <>
              <span style={{ color: "white" }}>Hi {user.username}! |</span>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        </div>
    )
}