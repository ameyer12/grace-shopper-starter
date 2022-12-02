import React, { useState } from 'react';
import swal from 'sweetalert';
import './register.css';

const Register = ({ registerUser, setToken }) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleRegister = async () => {

        try {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password.length > 6 && password === passwordConfirmation){
                const results = await registerUser(email, password);

                if(results.name == "UserExistsError"){
                    swal({
                        title: "Email is already registered",
                        text: "Please use a different email address"
                    })
                } else {
                    window.localStorage.setItem('token', results.token)
    
                    setToken(results.token)

                    swal({
                        icon: "success",
                    }).then(function() {
                        window.location = "/";
                    });
                }

            } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                swal({
                    title: "Invalid email address",
                    text: "Please enter a valid email address"
                })
            } else if(password.length < 6) {
                swal({
                    title: "Password is too short",
                    text: "Please supply a password with at least 6 characters"
                })
            } else if(password !== passwordConfirmation) {
                swal({
                    title: "Passwords do not match",
                    text: "Please double-check your entries"
                })
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (
        <div className='register'>
            <form className="card" id="register-form">
                <div className="form-group">
                <h1 className='register-h1'>Register</h1>
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
                <div id="register-form-id" className="form-group">
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
                <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword2" 
                placeholder="Confirm Password"
                onChange={(ev) => {
                    ev.preventDefault();
                    setPasswordConfirmation(ev.target.value)
                }}
                />
                <button 
                type="submit"
                id="register-page-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    handleRegister();
                }}
                >Sign Up</button>
                </div>
            </form>
        </div>
    )
}


export default Register;
