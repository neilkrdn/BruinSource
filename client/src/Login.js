import React from 'react';
import './Login.css';
import mainLogo from './bruinsource-logo.png'

class Login extends React.Component {
    render() {
        return (
            <div className="Login">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <form className="Inputs">
                    <div className="Username">
                        <input 
                        type="text" 
                        placeholder="Username..."
                        required
                        />
                    </div>
                    <div className="Password">
                        <input
                        type="text"
                        placeholder="Password..."
                        required
                        />
                    </div>
                <button type="button" className="NewAccount">New? Create an account.</button>
                <button type="button" className="ForgotPassword">Forgot your password?</button>
                </form>
            </div>
        );
    }
}

export default Login;