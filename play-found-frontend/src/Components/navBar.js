import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";


class NavBar extends Component {
  state = {
    menuOpen: false
  }

  showSettings =(e)=> {
     e.preventDefault();
     if (e.target.id === "show-menu"){
       this.setState({menuOpen: true})
     }
  }

  closeMenu =()=> {
     this.setState({menuOpen: false})
  }

  clickHandler =(e)=> {
    if (e.target.id === "log-out" ) {
      localStorage.removeItem("token")
      return ( <Redirect to="/"/> )
    }
  }


  render() {
    return (
      <div className="nav-header">
      { !this.state.isOpen &&
        <Menu  isOpen={this.state.menuOpen} noOverlay width={ isMobile ?'30%': '12%'} customBurgerIcon={false} >
          <br />
          <br />
          {!this.props.loggedIn ?
              <a id="log-in" className="menu-item" href="/login">Log In</a>
            :
            <a id="log-out" className="menu-item" href="/" onClick={(e)=> this.clickHandler(e)}>Log Out</a>
          }
          <br />
          {!this.props.loggedIn && <a  id="sign-up" className="menu-item" href="/signup">Sign Up</a> }
          {!this.props.loggedIn && <br />}
          <a id="find-playgrounds" className="menu-item" href="/playgrounds">Find Playground</a>
          {this.props.loggedIn && <br />}
          { this.props.loggedIn && <a id="add-playground" className="menu-item" href="/addplayground">Add A Playground</a>}
          {this.props.loggedIn && <br />}
          { this.props.loggedIn && <a id="add-bathroom" className="menu-item" href="/addbathroom">Add A Bathroom</a>}
          <div className="bm-slider-icon">
            <img alt=" " src={require("../assets/transparent-play-found-logo.png")}/>
          </div>
        </Menu>
      }
        <div className="nav-drop-menu">
          <img onClick={(e)=>this.showSettings(e)} id="show-menu" className="drop-menu" alt=" " src={require("../assets/transparent-drop-menu.png")}/>
        </div>
        <div className="castle-header">
          <img className="castle" alt=" " src={require("../assets/full-transparent-title-logo.png")}/>
        </div>
      </div>
    )
  }
}
const mapStateToProps =(state)=> {
  return {
    loggedIn: state.loggedIn
  }
}

// const mapDispatchToProps =(dispatch)=> {
//   changeLoggedIn: (this.props.loggedIn) =>({type: ""})
// }

export default connect(mapStateToProps)(NavBar)
