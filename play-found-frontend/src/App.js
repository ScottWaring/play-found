import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/navBar'
import Landing from './Containers/landing'
import Footer from './Components/footer'
require('dotenv').config()
class App extends Component {
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

export default App;
