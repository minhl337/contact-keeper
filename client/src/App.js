import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import "./App.css"

import About from "./components/pages/About"
import Home from "./components/pages/Home"
import Login from "./components/auth/Login"
import Navbar from "./components/layouts/Navbar"
import Alerts from "./components/layouts/Alerts"
import Register from "./components/auth/Register"

import AlertState from "./context/alert/AlertState"
import AuthState from "./context/auth/AuthState"
import ContactState from "./context/contact/ContactState"

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App
