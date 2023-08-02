import "./PasswordChange.css"
import React from "react"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';


export default function PasswordChange({ userID }) {
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password === secondPassword) {
            alert("Password do not match");
            return
        }
        try {
            // Make the  API request
            const response = await fetch(`https://fashionconnectapi.onrender.com/password-change`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, password }),
                credentials: 'include'
            });

            if (response.ok) {
                // Navigate to the home page after successful password change
                navigate('/');
            } else {
                // Handle the password change failure case
                alert('Login failed');
            }
        } catch (error) {
            // Handle any network or API request errors
            alert('Login failed: ' + error);
        }
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Password Change</h2>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={secondPassword}
                        onChange={(e) => setSecondPassword(e.target.value)}
                        required
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

