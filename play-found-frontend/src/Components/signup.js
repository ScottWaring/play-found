import React, { Component } from 'react'

class SignUp extends Component {
  state ={
    viewPW: false,
    userName: "",
    passWord1: "",
    passWord2: "",
    firstName:"",
    lastName: "",
    email: ""
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler =(e)=> {
    e.preventDefault(e)
    console.log(this.state)
  }

  showPW =()=> {
    this.setState({viewPW: !this.state.viewPW})
  }

  render(){
    return (
      <div className="sign-up-div">
        <form onSubmit={e=>this.submitHandler(e)}className="sign-up-form">
          <input name="userName" onChange={e=>this.changeHandler(e)} className="form-inputs" value={this.state.userName} placeholder="User Name"/><br />
          <input name="firstName" onChange={e=>this.changeHandler(e)} className="form-inputs" value={this.state.firstName} placeholder="First Name"/><br />
          <input name="lastName" onChange={e=>this.changeHandler(e)} className="form-inputs" value={this.state.lastName} placeholder="Last Name"/><br />
          <div onClick={this.showPW} className="pw-input-wrapper">
            <input name="passWord1" onChange={e=>this.changeHandler(e)} className="form-inputs view-pw" value={this.state.passWord1} placeholder="Password" type={this.state.viewPW ? "password" : "text"}/>
            <img className="eye-icon-pw" src={require("../assets/eye-icon.png")}/>
          </div>
          <input name="passWord2" onChange={e=>this.changeHandler(e)} className="form-inputs" value={this.state.passWord2} placeholder="Re-Password" type={this.state.viewPW ? "password" : "text"}/><br />
          <button className="btn" type="submit">Sign Up!</button>
        </form>
      </div>
    )
  }
}

export default SignUp
