import { display } from '@mui/system';
import React, { useState } from 'react';
import swal from 'sweetalert';
import './login.css';
// import { loginUser } from "../api";
// import { Snackbar } from "@mui/material";

const Login = ({navigate, loginUser}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    


    const handleLogin = async () => {

        try {
            const results = await loginUser(email, password);
    
            setToken(results.token)

            console.log(results)

            if(results.token != null) {
                swal({
                    icon: "success",
                }).then(function() {
                    window.location = "/";
                });
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

    // const handleLogout = async () => {
    //     try {
    //         window.localStorage.token = null;
    //         console.log(window.localStorage.token)
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
    return (
        <div className='login'>
            <div id="login-alert" className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>You're logged in!</strong>
                <button type="button" className="close btn" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
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
                <p className="sign-up-message">Don't have an account? <a className="sign-up-message" href="url">Sign Up</a></p>
                </div>
            </form>
        </div>
      )
}

export default Login;
