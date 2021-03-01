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
          <nav className="nav">
            <Link to="/" className="first">Home</Link>
            <Link to="/login" className="one">log In</Link>
            <Link to="/signup" className="two">Sign Up</Link>
            <Link to="/dashboard" className="three"><FontAwesome className="fas fa-user-circle" /></Link>
            <Link to="/cart" className="three"><FontAwesome className="fas fa-shopping-cart" /></Link>
          </nav>
        </div>

        {(globalState.loginStatus === false) ?
          <>
            <Switch>

              <Route exact={true} path="/">
                <Home />
              </Route>

              <Route exact={true} path="/login">
                <Login />
              </Route>

              <Route exact={true} path="/signup">
                <Signup />
              </Route>

              <Route path="/dashboard">
                <Signup />
              </Route>

              <Route path="/cart">
                <Login />
              </Route>

            </Switch>
          </>
          : null}

        {(globalState.loginStatus === true) ?

          <>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/login">
              <Dashboard />
            </Route>

            <Route path="/signup">
              <Dashboard />
            </Route>

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
          : null}
      </Router>


    </div>
  );
}

export default App;