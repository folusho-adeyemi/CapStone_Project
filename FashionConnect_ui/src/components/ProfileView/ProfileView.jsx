import './ProfileView.css';
import { Link } from "react-router-dom";
import React ,{useEffect}from "react";
import logo from "../../hello.gif"


export default function ProfileView({user}){

    return(
        <div className="container">
      <div className="header">
        {/* <span className="greeting">Hi {user.username}! |</span> */}
        <img className="profile-img" src={logo} alt="waving hand" />
        <p className="welcome-banner">WELCOME TO YOUR PROFILE</p>
      </div>
      <div className="details">
        <h2 className="detail-heading">User Details:</h2>
        <div className="detail-row">
          <span className="detail-label">First Name:</span>
          <span className="detail-value">{user.First_Name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Last Name:</span>
          <span className="detail-value">{user.Last_Name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Username:</span>
          <span className="detail-value">{user.username}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
      </div>
      <Link to="/editprofile" className="edit-link">Edit Profile</Link>
      <Link to="/" className="edit-link">Go Home</Link>
    </div>
  );
}