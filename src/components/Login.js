import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import swal from 'sweetalert';
import './login.css';

const Login = ({navigate, loginUser, setCart, setToken}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    
    const handleLogin = async () => {

        try {
            const results = await loginUser(email, password);

            if(results.message == "Login successful" && results.user.id === 1) {
                results.user.isAdmin = true
                window.localStorage.setItem('isAdmin', JSON.stringify(true))
                setIsAdmin(true)
            } else if(results.message == "Login successful" && results.user.id !== 1){
                window.localStorage.setItem('isAdmin', JSON.stringify("false"))
            }     

            setToken(results.token)
            
            window.localStorage.setItem('token', results.token)
            
            if(results.message == "Login successful") {
                swal({
                    icon: "success",
                })
            }
                
            if(results.name == "MissingCredentialsError") {
                swal({
                    title: "Missing credentials",
                    text: results.message
                });
            }

            if(results.name == "IncorrectCredentialsError") {
                swal({
                    title: "Incorrect credentials",
                    text: results.message
                });
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    const handleLogout = async () => {
        try {
            window.localStorage.token = null;
            window.localStorage.isAdmin = "";
            window.localStorage.setItem('cart', JSON.stringify([]))
            setCart([])
            navigate("/")
        } catch (error) {
            throw error;
        }
    }

    if(window.localStorage.token === "null" || window.localStorage.token === "undefined") {
        return (
            <div className='login'>
                <form className="card" id="login-form">
                    <div className="form-group">
                    <h1 className='login-h1'>Sign in</h1>
                    <label for="exampleInputEmail1">Email</label>
                    <input 
                    type="username" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    onChange={(ev) => {
                        ev.preventDefault();
                        setEmail(ev.target.value)
                    }}
                    />
                    </div>
                    <div id="login-form-id" className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password"
                    onChange={(ev) => {
                        ev.preventDefault();
                        setPassword(ev.target.value)
                    }}
                    />
                    <button 
                    type="submit"
                    id="login-page-button" 
                    className="btn btn-primary"
                    onClick={(ev) => {
                        ev.preventDefault();
                        handleLogin()
                    }}
                    >Sign In</button>
                    <p className="sign-up-message">Don't have an account? <a className="sign-up-message" href="/register">Sign Up</a></p>
                    </div>
                </form>
            </div>
          )
    } 
    else if (window.localStorage.token !== "null" && window.localStorage.token !== "undefined" && window.localStorage.isAdmin != "true"){
        return (
            <div id="account-page">
                <p id="account-page-p">My Account</p>
                <div id="profile-card" className="card">
                    <div className="card-body">
                        <button type="button" className="btn" 
                        onClick={() => {navigate("/Checkout")}}>Checkout</button>
                        <p className="card-text"> </p>
                        <p className="card-text">Reservation History</p>
                        <p className="card-text">Manage Addresses</p>
                        <p className="card-text">Account Details</p>
                    </div>
                </div>
                <button
                type="submit"
                id="sign-out-button" 
                className="btn btn-primary"
                onClick={() => {
                    handleLogout()
                }}
                >Sign Out</button>
            </div>
        ) 
    } else if(window.localStorage.isAdmin == "true") {
        return(
        <div id="account-page">
            <p id="account-page-p">My Account</p>
            <div id="profile-card" className="card">
                <div className="card-body">
                    <p className="card-text">Checkout</p>
                    <p className="card-text">Reservation History</p>
                    <p className="card-text">Manage Addresses</p>
                    <p className="card-text">Account Details</p>
                </div>
            </div>
            <button
                id="admin-button" 
                className="btn btn-primary"
                onClick={() => {
                    navigate("/admin")
                }}
            >Admin Dashboard</button>
            <button
            type="submit"
            id="sign-out-button" 
            className="btn btn-primary"
            onClick={() => {
                handleLogout()
            }}
            >Sign Out</button>
        </div>
        )
    }
}

export default Login;
