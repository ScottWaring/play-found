import React, { Component } from 'react'
import { isMobile } from "react-device-detect";

class LogIn extends Component {
  state ={
    viewPW: false,
    userName: "",
    passWord: "",
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler =(e)=> {
    e.preventDefault(e)
    fetch('localhost:3000', {
      method: 'POST',
      headers:{
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({})
    })
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
              <img className="eye-icon-pw" src={require("../assets/eye-icon.png")} alt=""/>
              <input name="passWord" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" }  value={this.state.passWord} placeholder="Password" type={this.state.viewPW ? "password" : "text"}/>
            </div>
            <div className="form-btn">
              <button className="btn hvr-bounce-in " type="submit">Log In</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn
