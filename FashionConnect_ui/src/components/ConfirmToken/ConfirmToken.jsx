import "./ConfirmToken.css"
import React, { useState, useEffect } from "react"
import PasswordChange from "../PasswordChange/PasswordChange";


export default function ConfirmToken({ email }) {

    const [token, setToken] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [userID, setUserID] = useState("")
    const [showResendButton, setShowResendButton] = useState(false);
    const [countdown, setCountdown] = useState(30);


    useEffect(() => {
        let timer;
        if (countdown > 0 && showResendButton === false) {
            timer = setTimeout(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000); // Decrease countdown by 1 second (1000 milliseconds)
        } else if (countdown === 0) {
            setShowResendButton(true);
        }

        // Clear the timer when the component unmounts or when the token changes
        return () => clearTimeout(timer);
    }, [countdown, showResendButton]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Make the API request
            const response = await fetch(`https://fashionconnectapi.onrender.com/reset-password/`, {
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

    const handleTryAgain = async (e) => {
        document.getElementById('text').value = "";
        e.preventDefault();

        try {

            // Make the API request
            const response = await fetch(`https://fashionconnectapi.onrender.com/forgotpassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                const loggedInUser = data.user;
                setShowResendButton(false)
                setCountdown(30)
                setToken("")
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
        <div>
            {!showPassword && (
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
                        <button className="reset-button" type="submit">Reset Password</button>
                        {!showResendButton ? (
                            <div className="countdown-container">
                                <div className="countdown-circle">
                                    <p className="countdown-text">{countdown}</p>
                                </div>
                                <p className="countdown-label">Seconds</p>
                            </div>
                        ) : (
                            <button className="try-again" onClick={handleTryAgain}>
                                Resend Token
                            </button>
                        )}
                    </form>
                </div>
            )}
            <div>
                {showPassword && <PasswordChange userID={userID} />}
            </div>
        </div>
    );
}