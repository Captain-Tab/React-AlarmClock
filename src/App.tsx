import React from "react";
import {
  Router,
  Route,
} from 'react-router-dom'
import Index from './component/Index/Index'
import Login from './component/Login'
import SignUp from './component/SignUp'
import './App.css'
import history  from './http/history';


class App extends React.Component{
  render() {
    return (
        <Router history={history}>
          <Route exact={true} path="/" component ={Index} />
          <Route path="/login" component={Login} />
          <Route path="/sign_up" component={SignUp} />
        </Router>
      )
  }
}

export default App