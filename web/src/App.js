import './App.css';
import React, { useContext } from "react";
import { useGlobalState, useGlobalStateUpdate } from "./contex/globalContex"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from "./components/home/home.jsx"
import Login from "./components/login/login.jsx"
import Signup from "./components/signup/signup.jsx"
import AdminDashboard from "./components/admin/addProducts"
import AddProducts from "./components/admin/adminDashboard"
// import Dashboard from "./components/dashboard/dashboard.jsx"
// import Cart from "./components/cart/cart"

var FontAwesome = require('react-fontawesome')

function App() {

  const globalState = useGlobalState()
  const setGlobalState = useGlobalStateUpdate()

  return (
    <div>
      <Router>
        <div className="App">
          <div className="logo">
            Ahmed Sweets
            </div>
          <nav className="nav">
            <Link to="/" className="first">Home</Link>
            <Link to="/login" className="one">log In</Link>
            <Link to="/signup" className="two">Sign Up</Link>
            <Link to="/addProduct" className="two">addProducts</Link>
            <Link to="/AdminDashboard" className="two">AdminDashboard</Link>
            <Link to="/dashboard" className="three"><FontAwesome className="fas fa-user-circle" /></Link>
            <Link to="/cart" className="three"><FontAwesome className="fas fa-shopping-cart" /></Link>
          </nav>
        </div>

        {globalState.role === null ?
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {/* <Route path="/forgetpw" component={ForgetPw} /> */}
              <Route path="*" />
              <Redirect to="/" />
              <Route />
            </Switch>
          </div> : null}

        {globalState.role === "user" ?
          <>
            <Route exact path="/" component={Home} />
            {/* <Route path="/basket" component={Basket} /> */}
            {/* <Route path="/myorders" component={MyOrders} /> */}
            {/* <Route path="/checkoutform" component={CheckOutForm} /> */}
            <Route path="*" />
            <Redirect to="/" />
            <Route />
          </> : null
        }
        {globalState.role === "admin" ?
          <>
            <Route  path="/AdminDashboard" component={AdminDashboard} />
            <Route  path="/addProduct" component={AddProducts} />
            <Route path="*" />
            <Redirect to="/" />
            <Route />
          </> : null
        }
      </Router>


    </div>
  );
}

export default App;