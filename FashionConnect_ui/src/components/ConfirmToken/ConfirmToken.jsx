import "./ConfirmToken.css"
import React, { useState } from "react"
import PasswordChange from "../PasswordChange/PasswordChange";


export default function ConfirmToken() {
    const [token, setToken] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [userID, setUserID] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Make the API request
            const response = await fetch(`http://localhost:3000/reset-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                const userID = data.user.id
              
                setUserID(userID)
                setShowPassword(true)
            } else {
                // Handle the password-reset failure case
                alert('Reset failed');
            }
        } catch (error) {
            // Handle any network or API request errors
            alert('Password-Rest failed: ' + error);
        }
    };

    return (
        <div className='reset-form-container'>
            <form className="reset-form" onSubmit={handleSubmit}>
                <h2 className="main-title">Forgot Password?</h2>
                <div className="form-group">
                    <label className="title" htmlFor="resetToken">Reset-Token</label>
                    <input
                        type="text"
                        id="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                </div>
                <button className="button" type="submit">Reset Password</button>
            </form>
            <div>
                {showPassword && <PasswordChange userID={userID} />}
            </div>
        </div>
    )
}
