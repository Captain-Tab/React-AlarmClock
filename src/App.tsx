import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import Index from './component/Index/Index'
import Login from './component/Login/Login'
import SignUp from './component/SignUp/SignUp'
import './App.css'


class App extends React.Component{


  render() {
    return (
        <Router>
          <Route exact={true} path="/" component ={Index} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Router>
      )
  }

}

export default App