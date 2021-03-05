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
import AdminDashboard from "./components/admin/adminDashboard"
import AddProducts from "./components/admin/addProducts"
import Dashboard from "./components/dashboard/dashboard.jsx"
import Cart from "./components/cart/cart"

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
          {globalState.role === null ?
            <nav className="nav">
              <Link to="/" className="first">Home</Link>
              <Link to="/login" className="one">log In</Link>
              <Link to="/signup" className="two">Sign Up</Link>
              <Link to="/cart" className="three"><FontAwesome className="fas fa-shopping-cart" /></Link>
            </nav> : null}
          {globalState.role === "user" ?
            <nav className="nav">
              <Link to="/" className="first">Home</Link>
              <Link to="/dashboard" className="three"><FontAwesome className="fas fa-user-circle" /></Link>
              <Link to="/cart" className="three"><FontAwesome className="fas fa-shopping-cart" /></Link>
            </nav> : null}

          {globalState.role === "admin" ?
            <nav className="nav">
              <Link to="/addProduct" className="two">AddProducts</Link>
              <Link to="/AdminDashboard" className="two">AdminDashboard</Link>
            </nav> : null}
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
            <Route path="/cart" component={Cart} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/checkoutform" component={CheckOutForm} /> */}
            <Route path="*" />
            <Redirect to="/" />
            <Route />
          </> : null
        }
        {globalState.role === "admin" ?
          <>
            <Route path="/" exact component={AdminDashboard} />
            <Route path="/addProduct" exact component={AddProducts} />
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