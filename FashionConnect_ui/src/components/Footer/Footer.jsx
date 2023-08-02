import * as React from "react";
import "./Footer.css";
import Logos from "./logos.png";
import happy from "./happy.svg";
import twitter from "./twitter.svg";
import instagram from "./instagram.svg";
import facebook from "./facebook.svg";

export default function Footer() {
  return (
    <>

      <div className="contacting">
        <div className="socials">
          <h2> Contact Us</h2>
          <p><strong>Email:</strong> code@path.org</p> 
          <p> <strong> Phone:</strong> 1-800-CODEPATH</p>{" "}
          <p> <strong>Address:</strong>: 123 Fake Street, San Francisco, CA </p>
         
        <div>
           <h2> <strong>Socials:</strong>   </h2>
            <img className="twittericon" src={twitter} />
            <img className="instagramicon" src={instagram} />
            <img className="facebookicon" src={facebook} />
            </div>
         
       
        </div>
        <div className="happy">
          <img src={happy}></img>
        </div>
      </div>
      <div>
        <div id="contact-us">
          <div className="contact">
            <div className="link-column">
              <h4>Categories</h4>
              <ul>
                <li>All Categories</li>
                <li>Clothing</li>
                <li>Food</li>
                <li>Accessories</li>
                <li>Tech</li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Support</h4>
              <ul>
                <li>Contact Us</li>
                <li>Money Refund</li>
                <li>Order Status</li>
                <li>Shipping Info</li>
                <li>Open Dispute</li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Account</h4>
              <ul>
                <li>Login</li>
                <li>Register</li>
                <li>Account Setting</li>
                <li>My Orders</li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Socials</h4>
              <ul>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}