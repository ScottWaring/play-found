import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux'
// import { Router } from "react-router-dom";

class SignUp extends Component {


  constructor(props) {
    super (props)
    this.safetyCheck = []
    this.state ={
      viewPW: false,
      submitStatus: false,
      userName: "",
      passWord1: "",
      passWord2: "",
      firstName:"",
      lastName: "",
      email: ""
    }
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  passwordCheck =()=> {
    let checker = /^(?=.*\d).{4,8}$/
    if (checker.test(this.state.passWord1)){
      this.safetyCheck.push("pw")
      return true
    } else {
      return (
        <div className="form-error">
         <h4>Please Enter A Valid Password</h4>
        </div>
      )
    }
  }

  passWordMatch =()=> {
    if (this.state.passWord1 !== this.state.passWord2 || !(this.state.passWord1 === "" && this.state.passWord2 === "" )) {
      return (
        <div className="form-error">
         <h4>Your Passwords Do Not Match</h4>
        </div>
      )
    } else if  (this.state.passWord1 === this.state.passWord2 && (this.state.passWord1 !== "" && this.state.passWord2 !== "" )){
      this.safetyCheck.push("pw1")
      return true
    }
  }

  emailCheck =()=> {
    let checker = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (checker.test(this.state.email)) {
      this.safetyCheck.push("pw2")
      return true
    } else {
      return (
        <div className="form-error">
         <h4>Please Enter A Valid Email</h4>
        </div>
      )
    }
  }

  userNameCheck =()=> {
    if (this.state.userName.length === 6) {
      this.safetyCheck.push("pw3")
      return true
    } else if (this.state.userName.length < 6){
      return (
        <div className="form-error">
         <h4>User Name Should Be Longer</h4>
        </div>
      )
    }
  }

  firstNameCheck =()=> {
    if (this.state.firstName.length === 2 ) {
      this.safetyCheck.push("pw4")
      return true
    } else if (this.state.firstName.length < 2) {
      return (
        <div className="form-error">
         <h4>First Name Should Be Longer</h4>
        </div>
      )
    }
  }

  lastNameCheck =()=> {
    if (this.state.lastName.length === 2) {
      this.safetyCheck.push("pw5")
      return true
    } else if (this.state.lastName.length < 2) {
      return (
        <div className="form-error">
         <h4>Last Name Should Be Longer</h4>
        </div>
      )
    }
  }

  submitHandler =(e)=> {
    e.preventDefault(e)
    localStorage.removeItem("token")
    let passUser
      let body = {
        password: this.state.passWord1,
        username: this.state.userName,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email
      }
      console.log(body)
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json',
         'accept': 'application/json'
       },
     body: JSON.stringify({user: body})
    })
    .then(res => {
      if (res.ok === true) {
        passUser = true
        return res.json()
      } else {
        console.log(res)
        alert('Please Try Again')
      }
    })
    .then(resJson => {
      if (passUser === true) {
        this.props.newUser(resJson)
        this.props.history.push('/')
      }
    })
    .then(this.setState({
      viewPW: false,
      submitStatus: false,
      userName: "",
      passWord1: "",
      passWord2: "",
      firstName:"",
      lastName: "",
      email: ""
    }))
    this.safetyCheck = []
  }

  showPW =()=> {
    this.setState({viewPW: !this.state.viewPW})
  }

  render(){
    return (
      <div className="sign-up-div">
        <div className={isMobile? "mobile-form-div" : "form-div" }>
          <div className="inner-form-div">
          <h3>Sign Up</h3>
          <form onSubmit={e=>this.submitHandler(e)} className="sign-up-form">
            <input name="userName" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } value={this.state.userName} placeholder="User Name" type="text"/><br />
            <input name="firstName" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } placeholder="First Name" type="text"/><br />
            <input name="lastName" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } placeholder="Last Name" type="text"/><br />
            <input name="email" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } value={this.state.email} placeholder="Email Address" type="text"/><br />
            <div onClick={this.showPW} className="pw-input-wrapper">
              <img className="eye-icon-pw" src={require("../assets/eye-icon.png")} alt=""/>
              <input name="passWord1" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" }  value={this.state.passWord1} placeholder="Password" type={this.state.viewPW ? "password" : "text"}/>
            </div>
            <input name="passWord2" onChange={e=>this.changeHandler(e)} className={isMobile? "mobile-form-inputs" : "form-inputs" } value={this.state.passWord2} placeholder="Re-Enter Password" type={this.state.viewPW ? "password" : "text"}/><br />
            <div className="form-btn">
              <button className={this.safetyCheck.length >= 6 ? "btn hvr-bounce-in submit-btn" : "btn hvr-bounce-in no-submit-btn" } type="submit">Sign Up!</button>
            </div>
          </form>
          <div className="errors-box">
          {this.userNameCheck()}
          {this.firstNameCheck()}
          {this.lastNameCheck()}
          {this.emailCheck()}
          {this.passwordCheck()}
          {this.passWordMatch()}
          </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    newUser: (user) => dispatch({type: "LOG_IN_USER", payload: user})
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
