import React, { useState } from 'react';
import axios from 'axios'
var FontAwesome = require('react-fontawesome')

function AddProducts() {
    let url = 'http://localhost:5000'
    let [msg, setMsg] = useState()

    function addProduct(e) {
        e.preventDefault()
        var fileInput = document.getElementById("customFile");
        var productName = document.getElementById("pName");
        var price = document.getElementById("price");
        var description = document.getElementById("description");
        var stock = document.getElementById("stock");
        let formData = new FormData();
        formData.append("myFile", fileInput.files[0]);
        formData.append("productName", productName.value);
        formData.append("price", price.value);
        formData.append("description", description.value);
        formData.append("stock", stock.value);

        axios({
            method: 'post',
            url: url + "/addProduct",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })

            .then(response => {
                console.log("response data=> ", response.data);
                setMsg(response.data.message)
            })
            .catch(err => {
                console.log(err);
            })

    }
    console.log(msg)
        
    return (
        <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={addProduct} >
                            <span className="login100-form-title">
                                Hi! Admin<p>Add New Products</p>
                            </span>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="pName" type="text" placeholder="Product Name" required />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-tags" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="price" type="number" placeholder="Product Price" required />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-money" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="stock" type="text" placeholder="Stock Available" required />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-inbox" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="description" type="text" placeholder="Description" required />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-file" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div class="wrap-input100 validate-input">
                                <input class="input100" id="customFile" type="file" placeholder="Choose File" required />
                                <span class="focus-input100"></span>
                                <span class="symbol-input100">
                                    <i class="fa fa-image" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProducts;