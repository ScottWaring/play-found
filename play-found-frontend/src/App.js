import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUser } from './actions/actions'
import Landing from './Containers/landing'
import Footer from './Components/footer'
import NavBar from './Components/navBar'
require('dotenv').config()

class App extends Component {

  componentDidMount() {
    if (localStorage.token && Object.keys(this.props.user).length < 1) {
      this.props.getUser(localStorage.token)
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
        <Footer />
      </div>
    );
  }
}


const mapStateToProps =(state)=> {
  return {
    user: state.user
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    getUser: (token) => dispatch(getUser(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
