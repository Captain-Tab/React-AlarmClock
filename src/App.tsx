import React from "react";
import {
  Router,
  Route,
} from 'react-router-dom'
import Home from './view/Home'
import Login from './view/Login'
import SignUp from './view/SignUp'
import history  from './http/history';
import './App.css'

class App extends React.Component{
  render() {
    return (
        <Router history={history}>
          <Route exact={true} path="/" component ={Home} />
          <Route path="/login" component={Login} />
          <Route path="/sign_up" component={SignUp} />
        </Router>
      )
  }
}

export default App