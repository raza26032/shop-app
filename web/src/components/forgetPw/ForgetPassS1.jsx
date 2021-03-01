import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {
    useHistory
} from "react-router-dom";
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalContext'
function ForgetPw() {
    let url = 'http://localhost:5000'
    let [next, setNext] = useState(true);
    let [next2, setNext2] = useState(true);
    let [resMsg, setResMsg] = useState('');
    let [resErrorMsg, setResErrorMsg] = useState('');
    let form = {
        boxShadow: "0 0 10px grey",
        padding: "20px",
        marginTop: "50px"
    }
    function nextStep() {
        setNext(prev => !prev)
    }
    function nextStep2() {
        setNext2(prev => !prev)
        console.log(document.getElementById('otp').value)

    }
    function getEmail(e) {
        e.preventDefault()
        let email = document.getElementById('email').value;
        axios({
            method: 'post',
            url: url + '/forget-password',
            data: {
                email: email,
            },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if (response.data.status === 200) {
                setResMsg(response.data.message)
                nextStep()
            }
            else {
                setResErrorMsg(response.data.message)
            }
        }, (error) => {
            console.log(error);
        });
    }
    function ForgetPw2(e) {
        e.preventDefault()
        console.log(document.getElementById('password').value)
        console.log(document.getElementById('otp').value)
        axios({
            method: 'post',
            url: url + '/forget-password-2',
            data: {
                newPassword: document.getElementById('password').value,
                otp: document.getElementById('otp').value,
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                // location.href = "./login.html"
            }
            else {
                alert(response.data.message)
            }
        }, (error) => {
            console.log(error);
        });

    }
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            {/* <img src="https://thekababjeesbakers.com/wp-content/uploads/2020/03/Mix-Mithai-Box.jpg" alt="IMG" /> */}
                        </div>

                        <form action="#" className="login100-form validate-form" onSubmit={login} >
                            <span className="login100-form-title">
                                Log In<p>It's quick and easy.</p>
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" id="email" type="email" name="email" placeholder="Enter Email" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" id="password" type="password" name="pass"
                                    placeholder="Enter Password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>
                            <hr style={{ marginLeft: "100px" }}></hr>
                            <p onClick={goToForget}
                                style={{ cursor: "pointer", textAlign: "center", marginLeft: "100px" }}>Forget Password?</p>
                            <hr style={{ marginLeft: "100px" }}></hr>
                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Log In
						</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPw