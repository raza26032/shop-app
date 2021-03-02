import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useGlobalState, useGlobalStateUpdate } from "../../contex/globalContex";
var FontAwesome = require('react-fontawesome')

function AdminDashboard() {
    let [orderData, setOrderData] = useState([])
    const globalStateUpdate = useGlobalStateUpdate()
    let history = useHistory()
    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            console.log(response)
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
                role: null
            }))
            history.push("/login")

        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getOrders',
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data)
            setOrderData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function updateStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "Order confirmed"
            },
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data)
            setOrderData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    console.log("Order data", orderData)
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title" style={{ fontSize: "30px" }}>
                                Customers Orders<p>Check it Now!</p>
                            </span>
                            <div>
                                {
                                    orderData && orderData.map((v, i) => {
                                        return (
                                            <div>
                                                <div className="limiter">
                                                    <div className="container-login100">
                                                        <div className="wrap-login100">
                                                            <div class="wrap-input100 validate-input">
                                                                <input class="input100" placeholder="Name">{v.name}</input>
                                                                <span class="focus-input100"></span>
                                                                <span class="symbol-input100">
                                                                    <i class="fa fa-user" aria-hidden="true"></i>
                                                                </span>
                                                            </div>

                                                            <div class="wrap-input100 validate-input">
                                                                <input class="input100" placeholder="Address">{v.address}</input>
                                                                <span class="focus-input100"></span>
                                                                <span class="symbol-input100">
                                                                    <i class="fa fa-home" aria-hidden="true"></i>
                                                                </span>
                                                            </div>

                                                            <div class="wrap-input100 validate-input">
                                                                <input class="input100" placeholder="Number">{v.phone}</input>
                                                                <span class="focus-input100"></span>
                                                                <span class="symbol-input100">
                                                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                                                </span>
                                                            </div>
                                                        </div><hr />
                                                        {
                                                            v.orders.map((v, i) => {
                                                                return (
                                                                    <div>
                                                                        <div class="wrap-input100 validate-input">
                                                                            <input class="input100" placeholder="">{v.name}</input>
                                                                            <span class="focus-input100"></span>
                                                                            <span class="symbol-input100">
                                                                                <i class="fa fa-user" aria-hidden="true"></i>
                                                                            </span>
                                                                        </div>

                                                                        <div class="wrap-input100 validate-input">
                                                                            <input class="input100" placeholder="PKR">{v.price}</input>
                                                                            <span class="focus-input100"></span>
                                                                            <span class="symbol-input100">
                                                                                <i class="fa fa-money" aria-hidden="true"></i>
                                                                            </span>
                                                                        </div>

                                                                        <div class="wrap-input100 validate-input">
                                                                            <input class="input100" placeholder="Kg">{v.qty}</input>
                                                                            <span class="focus-input100"></span>
                                                                            <span class="symbol-input100">
                                                                                <i class="fa fa-balance-scale" aria-hidden="true"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <hr />
                                                        <div class="wrap-input100 validate-input">
                                                            <input class="input100" placeholder="Total Amount: PKR =">{v.total}</input>
                                                            <span class="focus-input100"></span>
                                                            <span class="symbol-input100">
                                                                <i class="fa fa-tasks" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                        <div className="container-login100-form-btn">
                                                            <button className="login100-form-btn" onClick={() => { updateStatus(v._id) }} >Confirm Order</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard