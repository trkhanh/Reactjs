import React, { Component } from 'react';
import './App.css';
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import SignUp from './pages/loginsignup/SignUp';
import Login from './pages/loginsignup/Login'
import Question from './pages/question/question'
import { insertToken } from './redux/actions/tokenActions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


class App extends Component {
  render() {
  console.log('localstorage auth:');
  console.log(JSON.parse(localStorage.getItem('auth')))
   this.props.insertToken()
    return (
        <div>
        <Router>
          <Switch>
            <Route  path="/login" component={Login} />
            <Route  path="/signup" component={SignUp} />
            <Route  path="/profile" component={Profile} />
            <Route path="/question" component={Question}/>
            <Route exact path="/" component={Login}/> 
          </Switch>
        </Router>
        </div>
    )
  }
}
export default connect(null,{ insertToken })(App)
