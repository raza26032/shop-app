import React, { useState } from "react";
import axios from "axios";
import {
    useHistory
} from "react-router-dom";

var FontAwesome = require('react-fontawesome')

function Signup() {
    let url = 'http://localhost:5000'
    let [change, setChange] = useState(true)
    // let [userData, setUserData] = useState([])
    let [show, setShow] = useState()

    let history = useHistory()
    function handleClick() {
        history.push("/login");
    }

    function signup(event) {
        event.preventDefault();

        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let phone = document.getElementById('phone').value
        let password = document.getElementById('password').value
        let newData = {
            name: name,
            email: email,
            password: password,
            phone: phone
        }
        // setUserData(previousValue => {
        //     return previousValue.concat([newData]);
        // })
        axios({
            method: 'post',
            url: url + '/signup',
            data: newData,
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                history.push("/login");
                alert("Singup Successfully")
                setChange(false)
            }
            else {
                history.push("/signup");
                setShow(response.data.message)
            }
            // console.log(response.data.message)
        }).catch((error) => {
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

                        <form className="login100-form validate-form" onSubmit={signup} >
                            <span className="login100-form-title">
                                Sign Up<p>It's quick and easy.</p>
                            </span>

                            <div class="wrap-input100 validate-input" data-validate="Name is required">
                                <input class="input100" id="name" type="text" name="name" placeholder="Full Name" required/>
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" id="email" type="email" name="email" placeholder="Enter Email" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" id="password" type="password" name="pass"
                                    placeholder="Enter Password" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Phone is required">
                                <input className="input100" id="phone" type="number" name="phone" placeholder="Phone Number" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Gender is required">
                                <input className="input100" id="gender" type="text" name="gender" placeholder="Enter Gender" required/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-venus-mars" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Signup;