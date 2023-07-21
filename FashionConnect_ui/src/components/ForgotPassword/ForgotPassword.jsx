import { useState } from "react"
import "./ForgotPassword.css"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router";


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const token = uuidv4();
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {

            // Make the API request
            const response = await fetch(`http://localhost:3000/forgotpassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                const userID = data.passwordAUTH.userID
                const newToken = data.passwordAUTH.token

                navigate('/reset-password');
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
        <div className='email-form-container'>
            <form className="email-form" onSubmit={handleForgotPassword}>
                <h2>Forgot Password?</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button  type="submit">Confirm Email</button>
            </form>
        </div>
    )
}