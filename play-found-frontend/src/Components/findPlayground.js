import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { callBackEndGoogle } from '../actions/actions'

class FindPlaygrounds extends Component {

  state = {
    location_input: ""
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

 //  callBackEndGoogle =(body)=> {
 //  console.log(body)
 //  fetch(`http://localhost:3000/search`,{
 //       method: 'POST',
 //       headers: {
 //         "Content-Type": "application/json"
 //       },
 //       body: JSON.stringify(body)
 //     })
 //     .then(res => res.json())
 //     .then(console.log)
 // }


  submitHandler =(e)=> {
    e.preventDefault()
    console.log(this.props)
    let body = {}
    if (this.state.location_input === "" ) {
       let latLongAssign = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function success(position) {
              body.long = position.coords.longitude;
              body.lat = position.coords.latitude;
              resolve(body)
         }
     )}).then((body) => this.props.googleFetch(body))
      } else {
        body.location = this.state.location_input
        this.props.googleFetch(body)
    }
      console.log(body)
      this.setState({location_input: ""})
  }


  render() {
    let box
    let inputField
    let searchBtn
    {isMobile ? searchBtn ="mobile-search-button" : searchBtn ="search-button"}
    {isMobile ? inputField = "mobile-search-input" : inputField = "search-input"}
    {isMobile ? box = "find-box-mobile" : box = "find-box"}
    return (
      <div className="find-playground-div">
        <div className={box}>
          <form onSubmit={(e)=>this.submitHandler(e)} className="playground-finder">
            <div className="search-input-div">
              <input id={inputField} onChange={this.changeHandler} className="form-inputs" value={this.state.location_input} name="location_input" type="text" placeholder="Search Location"/>
            </div>
            <div className={searchBtn}>
            <button type="submit" id="big-btn" className= "btn hvr-bounce-in submit-btn">Find Playgrounds</button>
          </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=> {
  return({
    googleFetch: (body) => dispatch(callBackEndGoogle(body))
  })
}

export default connect(null, mapDispatchToProps)(FindPlaygrounds)
