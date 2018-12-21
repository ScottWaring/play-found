import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";
import { Redirect, withRouter, Link } from "react-router-dom";
import { logUserOut } from '../actions/actions'


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
    let navHeader
    if (isMobile) {
      navHeader = "nav-header-mobile"
    } else {
      navHeader = "nav-header"
    }
    return (
      <div className={navHeader}>
      { !this.state.isOpen &&
        <Menu  isOpen={this.state.menuOpen} noOverlay width={ isMobile ?'30%': '12%'} customBurgerIcon={false} >
          <br />
          <br />
          {!this.props.loggedIn ?
              <Link id="log-in" className="menu-item" to="/login">Log In</Link>
            :
            <Link id="log-out" className="menu-item" onClick={this.props.logUserOut} to='/'>Log Out</Link>
          }
          <br />
          {!this.props.loggedIn && <Link  id="sign-up" className="menu-item" to="/signup">Sign Up</Link> }
          {!this.props.loggedIn && <br />}
          <Link id="find-playgrounds" className="menu-item" to="/playgrounds">Find Playground</Link>
          {this.props.loggedIn && <br />}
          { this.props.loggedIn && <Link id="add-playground" className="menu-item" to="/addplayground">Add A Playground</Link>}
          {this.props.loggedIn && <br />}
          { this.props.loggedIn && <Link id="add-bathroom" className="menu-item" to="/addbathroom">Add A Bathroom</Link>}
          <div className="bm-slider-icon">
            <img alt=" " src={require("../assets/transparent-play-found-logo.png")}/>
          </div>
        </Menu>
      }
        <div className="nav-drop-menu">
          <img onClick={(e)=>this.showSettings(e)} id="show-menu" className="drop-menu" alt=" " src={require("../assets/transparent-drop-menu.png")}/>
        </div>
        <div className="castle-header">
          <img onClick={()=> this.props.history.push('/')} className="castle" alt=" " src={require("../assets/full-transparent-title-logo.png")}/>
        </div>
        {this.props.loggedIn === true &&
          <div  id="user-greeting">
            <Link to='/userprofile'>Welcome back {this.props.user.username}!</Link>
          </div>
        }
      </div>
    )
  }
}

  const mapStateToProps =(state)=> {
    return {
      loggedIn: state.loggedIn,
      user: state.user
    }
  }

  const mapDispatchToProps =(dispatch)=> {
    return {
      logUserOut: () => dispatch(logUserOut())
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
