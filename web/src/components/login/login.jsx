import { useGlobalState, useGlobalStateUpdate } from '../../contex/globalContex'
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

var FontAwesome = require('react-fontawesome')

function Login() {
    let url = 'http://localhost:5000'
    let [show, setShow] = useState()
    let history = useHistory()
    const globalState = useGlobalState()
    const setGlobalState = useGlobalStateUpdate()
    function login(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: url + '/login',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if (response.data.status === 200) {
                setGlobalState(prev => ({
                    ...prev,
                    loginStatus: true,
                    role: response.data.user.role
                }))
            }
            else {
                history.push("/login");
                setShow(response.data.message)
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    function goToForget() {
        history.push("/forgetpw");
    }

    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
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
<hr style={{marginLeft: "100px"}}></hr>
                            <p onClick={goToForget}
                                style={{ cursor: "pointer", textAlign: "center", marginLeft: "100px" }}>Forget Password?</p>
<hr style={{marginLeft: "100px"}}></hr>
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
export default Login;