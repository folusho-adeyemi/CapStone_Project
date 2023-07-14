import "./ProfileView.css";
import { Link } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext.js";

export default function ProfileView(){
    const { user, updateUser } = useContext(UserContext);

    return(
        <div>
            <span style={{ color: "black" }}>Hi {user.username}! |</span>
            <p style={{color: "black"}}>WELCOME TO YOUR PROFILE</p>
            <Link to="/editprofile">Edit Profile</Link>
        </div>
    )
}