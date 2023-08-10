import React from "react";
import "./NavBar.css";
import { useContext } from "react";
import { UserContext } from "../../UserContext.jsx";
import { Link } from "react-router-dom";
import logo from "../../logo-transparent-png.png";


export default function NavBar() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clear user data from localStorage, reset user state, etc.
    updateUser(null);
  };

  return (
    <div className="navbar">
      <div className='logo'>
        <img src={logo}></img>
      </div>
      <div className="user-info">
        {user ? (
          <div className="profile">
            <span style={{ color: "black" }}>Hi {user.username}! </span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="profile-click"><Link to="/profile"> Profile  </Link> </button>
           <button className="collection-click"><Link to="/collections/:userId"> Collection  </Link></button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  )
}