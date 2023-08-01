import { useState, useContext } from "react"
import "./ForgotPassword.css"
import { useNavigate } from "react-router";
import { UserContext } from '../../UserContext.jsx';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {

            // Make the API request
            const response = await fetch(`https://fashion-connect-gwt7.vercel.app/forgotpassword/`, {
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

                // Update the user context
                updateUser(loggedInUser);

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
                <button type="submit">Confirm Email</button>
            </form>
        </div>
    )
}
