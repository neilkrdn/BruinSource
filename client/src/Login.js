import React from 'react';
import './Login.css';
import history from './history';
import mainLogo from './bruinsource_logo.png'
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            responseText: null,
        }
    }

    onLogin = () => {
        axios.post('/api/login', {username: this.state.username, password:this.state.password})
        .then(res => {
            if (res.data.msg === 'success') {
                history.push('/dashboard')
            } 
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
    }

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
                        onChange={input => {
                            this.setState({username: input.target.value})
                        }}
                        />
                    </div>
                    <div className="Password">
                        <input
                        type="password"
                        placeholder="Password..."
                        required
                        onChange={input => {
                            this.setState({password: input.target.value})
                        }}
                        />
                    </div>
                <button type="button" className="NewAccount" onClick={() => history.push('/register')}>New? Create an account.</button>
               {/* <button type="button" className="ForgotPassword">Forgot your password?</button> */}
                <button type="button" onClick={this.onLogin} className="SignIn" >Sign In</button>
                </form>
            </div>
        );
    }
}

export default Login;