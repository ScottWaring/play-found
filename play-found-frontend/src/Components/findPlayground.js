import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { withRouter } from "react-router-dom";
import { callBackEndGoogle, addCoordinates, returnLocalBathrooms } from '../actions/actions'

class FindPlaygrounds extends Component {

  state = {
    location_input: ""
  }

  componentDidMount() {
     console.log("find component")
    this.props.clearState()
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  callBackEnd =(body)=> {
    this.props.addCoords(body)
    this.props.findBathrooms(body)
    this.props.googleFetch(body)
  }

  submitHandler =(e)=> {
    e.preventDefault()
    let searchSplit = this.state.location_input.replace(/ /g, "+").replace(/,/g, "")
    let body = {}
     let API_KEY = process.env.REACT_APP_MAPQUEST_API_KEY
    if (searchSplit !== "") {body.location = searchSplit}
    if (this.state.location_input === ""){
     new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function success(position) {
            body.long = position.coords.longitude;
            body.lat = position.coords.latitude;
            resolve(body)
         }
       )}).then((body) => this.callBackEnd(body))
     } else {
       let body2 = {}
       let locationInput = this.state.location_input.replace(/" "/g, ",")
       let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${locationInput}`
       fetch(url)
       .then(res=>res.json())
       .then(res => {
         body2.lat = res.results[0].locations[0].latLng.lat
         body2.long = res.results[0].locations[0].latLng.lng
         this.props.googleFetch(body)
         this.props.addCoords(body2)
         this.props.findBathrooms(body2)
       })

     }

      this.setState({location_input: ""})
      this.props.history.push("/playgrounds/search/results")
  }


  render() {
    let box
    let inputField
    let searchBtn
    let btn
    let inputDiv
    if (isMobile) {
      searchBtn ="mobile-search-button"
      inputField = "mobile-search-input"
      box = "find-box-mobile"
      btn = "big-btn-mobile"
      inputDiv = "search-input-div-mobile"
    } else {
      searchBtn ="search-button"
      inputField = "search-input"
      box = "find-box"
      btn = "big-btn"
      inputDiv = "search-input-div"
    }
    return (
      <div className="find-playground-div">
        <div className={box}>
          <form onSubmit={(e)=>this.submitHandler(e)} className="playground-finder">
            <div className={inputDiv}>
              <input id={inputField} onChange={this.changeHandler} className="form-inputs" value={this.state.location_input} name="location_input" type="text" placeholder="Search Location"/>
            </div>
            <div className={searchBtn}>
            <button type="submit" id={btn} className="btn submit-btn"><p>Find Playgrounds</p></button>
          </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=> {
  return({
    googleFetch: (body) => dispatch(callBackEndGoogle(body)),
    addCoords: (body) => dispatch(addCoordinates(body)),
    findBathrooms: (body) => dispatch(returnLocalBathrooms(body)),
    clearState: () => dispatch({type: "CLEAR_OLD_STATE", payload: ""})
  })
}

export default withRouter(connect(null, mapDispatchToProps)(FindPlaygrounds))
