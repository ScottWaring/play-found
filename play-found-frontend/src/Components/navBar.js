import React, { Component } from 'react'

class NavBar extends Component {

  render() {
    return (
      <div className="nav-header">
        <div className="nav-drop-menu">
          <img className="drop-menu" alt=" " src={require("../assets/transparent-drop-menu.png")}/>
        </div>
        <div className="castle-header">
          <img className="castle" alt=" " src={require("../assets/full-transparent-title-logo.png")}/>
        </div>
      </div>
    )
  }
}

export default NavBar
