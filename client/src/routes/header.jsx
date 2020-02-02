// JavaScript source code
import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/login';

class Header extends React.Component {

    state = {
        loginShown: false,
        username: "",
        password: "",
        timer: null,
        loginPressed: false
    };
    
    useEffect = () => {
        if (!this.state.loginShown) {
            console.log("use");
            this.setState({
                timer: setTimeout(() => {
                    document.getElementById("login").className = "showLogin";
                    this.setState({ loginShown: true });
                }, 1000)
            });
            return () => clearTimeout(this.state.timer);
        }
    }

    resetEffect = () => {
        console.log("reset");
        clearTimeout(this.state.timer);
    }

    updateUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    Login = () => {
        if (!this.state.loginPressed) {
            document.getElementById("login").className = "hideLogin";
            document.getElementById("ActualLogin").className = "LoginShow";
            document.getElementById("HeaderLayout").className = "hideSome";
            this.setState({ loginPressed: true });
        }
    }

    SubmitLogin = (event) => {
        event.preventDefault();
        fetch('/api/account')
            .then(res => res.json())
            .then(res => {
                if (this.state.username === res[0].username && this.state.password === res[0].password) {
                    console.log("Logged in");
                    document.getElementById("ActualLogin").className = "LoginHide";
                    this.props.login();
                } else {
                    alert("Failed to log in!");
                }
            })
    }

    render() {

        return (
            <div id="HeaderLayout" >
                <div id="Logo">
                    <Link to="/" className="url">
                        <b>DDQ</b>
                    </Link>
                </div>  

                <div id="HeaderLoginLayout" className="#">

                    <div className="ControlButton">
                        <Link to="/progress" className="url">Progression</Link>
                    </div>

                    <div onMouseOver={!this.props.isLogged ? this.useEffect : null} onMouseOut={this.resetEffect} id="LoginButton">
                        <div className="hideLogin" id="login">
                            <button type="button" className="loginBtn" onClick={this.Login} disabled={!this.state.loginShown}>Login</button>
                        </div>
                    </div>

                    <div className="LoginHide" id="ActualLogin">
                        <form onSubmit={this.SubmitLogin}>
                            <div id="LoginLayout">
                                <input type="text" placeholder="enter username..." onChange={this.updateUsername} />
                                <input type="password" placeholder="enter password..." onChange={this.updatePassword} />
                                <input type="submit" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = () => {
    return {
        login
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(Header);