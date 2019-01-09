import React, { Component } from 'react'
import { isMobile } from "react-device-detect"
import { logUserIn } from '../actions/actions'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";


class LogIn extends Component {
  state ={
    viewPW: false,
    userName: "",
    passWord: "",
  }
  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push('/userprofile')
    }
  }
  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler =(e)=> {
    e.preventDefault(e)
    let body = {username: this.state.userName, password: this.state.passWord}
    this.props.logIn(body)

  }

  showPW =()=> {
    this.setState({viewPW: !this.state.viewPW})
  }

  render(){
    return (
      <div className="sign-up-div">
        <div className={isMobile? "mobile-form-div" : "form-div" }>
          <div className="inner-form-div">
          <h3>Log In</h3>
          <form onSubmit={e=>this.submitHandler(e)} className="sign-up-form">
            <input name="userName" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } value={this.state.userName} placeholder="User Name" type="text"/><br />
            <div onClick={this.showPW} className="pw-input-wrapper">

              <input name="passWord" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" }  value={this.state.passWord} placeholder="Password" type={this.state.viewPW ? "password" : "text"}/>
              <img id="log-in-eye" className="eye-icon-pw" src={require("../assets/eye-icon.png")} alt=""/>
            </div>
            <div className="form-btn">
              <button id="big-btn" className="btn submit-btn " type="submit">Log In</button>
            </div>
          </form>
          </div>
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
const mapDispatchToProps =(dispatch)=> {
  return {
    logIn: (body) => dispatch(logUserIn(body))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn))
