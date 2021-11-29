import React from 'react';
import './Register.css';
import mainLogo from './bruinsource_logo.png'

class Register extends React.Component {
    render() {
        return (
            <div className="Register">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> Create Your New Account</h2>
                <form className="Inputs">
                    <div className="FormBox">
                        <input 
                        type="text" 
                        placeholder="Username..."
                        required
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="password"
                        placeholder="Password..."
                        required
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="email"
                        placeholder="yourname@website.com..."
                        required
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="url"
                        placeholder="http://github.com/..."
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="text"
                        placeholder="Known Languages (comma-separated)..."
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="number"
                        min="0" 
                        step="1"
                        placeholder="Years of Experience..."
                        />
                    </div>
                    <div className="FormBox">
                        <input
                        type="number"
                        min="0" 
                        step="1"
                        placeholder="Number of projects you've done..."
                        />
                    </div>

                    <div className="Buttons">
                        <button type="button" className="BackToLogin">Back to Login</button>
                        <button type="button" className="CreateNewAccount">Create New Account</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;