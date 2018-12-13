import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'

class NavBar extends Component {
  state = {
    isOpen: false
  }
  showSettings (event) {
     event.preventDefault();
     this.setState({isOpen: true})
  }

  render() {
    return (
      <div className="nav-header">
      <Menu width={'30%'} >
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
      </Menu>
        <div className="nav-drop-menu">
          <img onClick={ this.showSettings } className="drop-menu" alt=" " src={require("../assets/transparent-drop-menu.png")}/>
        </div>
        <div className="castle-header">
          <img className="castle" alt=" " src={require("../assets/full-transparent-title-logo.png")}/>
        </div>
      </div>
    )
  }
}

export default NavBar
