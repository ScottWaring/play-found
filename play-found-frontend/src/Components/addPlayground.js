import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux';
import AddMap from './addMap'
import { addCoordinates } from '../actions/actions'

class AddPlayground extends Component {
  state = {
    pgName: "",
    pgLocation: "",
    pgDescription: "",
    businessType:"",
    bathroom: "",
    photos: [],
    photoPath: [],
    lat: "",
    long: "",
    checkAddress: false
  }

  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fileHandler =(e)=> {
    this.setState({
      photos: [...this.state.photos, e.target.files[0]]
    })
  }

  submitHandler =(e)=> {
    e.preventDefault()
    console.log(this.state)
  }

  getAddress =(body)=> {
    this.props.addCoords(body)
    let url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + process.env.REACT_APP_MAPQUEST_API_KEY + "&location=" + body.lat +","+ body.long +"&includeRoadMetadata=true&includeNearestIntersection=true"
    fetch(url)
    .then(res => res.json())
     .then(res =>
     {
      if (res.status > 0) {
        alert("No results found, please try again")
      } else  {
        let r = res.results[0].locations[0]
        let address = r.street + " " + r.adminArea5 + ", " + r.adminArea3
        this.setState({
          lat: body.lat,
          long: body.long,
          pgLocation: address,
          checkAddress: true
        })
      }
    })
  }

  findLoc =()=> {
    let body = {}
    new Promise(function(resolve, reject) {
       navigator.geolocation.getCurrentPosition(function success(position) {
           body.long = position.coords.longitude;
           body.lat = position.coords.latitude;
           resolve(body)
        }
      )}, 300).then((body) => this.getAddress(body))
  }

  componentDidUpdate(prevProps) {
    if (this.state.photos.length > 0 && this.state.photoPath.length < this.state.photos.length){
      this.state.photos.map(photo => {
        let reader  = new FileReader()
        reader.readAsDataURL(photo)
        reader.onloadend =()=> {
          if (!this.state.photoPath.includes(reader.result)) {
            return this.setState({photoPath: [...this.state.photoPath, reader.result]})
          }
        }
      })
    }
  }

  render(){
    let addBox
    let searchBox
    let addForm
    let inputs
    let buttons
    let eachButton
    let addPic
    let picInput
    let photoBox
    let userImage
    let btn
    let buttonBox
    let currentLocation
    let mapBox
    if (isMobile) {
      addBox = "add-box-mobile"
      searchBox = "search-box-mobile"
      addForm = "add-form-mobile"
      inputs = "mobile-form-inputs"
      buttons = "inner-form-buttons-mobile"
      eachButton = "inner-form-buttons-each-mobile"
      addPic = "pg-pic-div-mobile"
      picInput = "pg-pic-upload-mobile"
      photoBox = "add-pg-photo-review-mobile"
      userImage = "small-review-photo-mobile"
      btn = "add-button-mobile"
      buttonBox = "add-button-box-mobile"
      currentLocation ="get-current-location-mobile"
      mapBox = "add-pg-mapbox-mobile"
    } else {
      addBox = "add-box"
      searchBox = "search-box"
      addForm = "add-form"
      inputs = "form-inputs user-add-form-inputs"
      buttons = "inner-form-buttons"
      eachButton = "inner-form-buttons-each"
      addPic = "pg-pic-div"
      picInput = "pg-pic-upload"
      photoBox = "add-pg-photo-review"
      userImage = "small-review-photo"
      btn = "add-button"
      buttonBox = "add-button-box"
      currentLocation = "get-current-location"
      mapBox = "add-pg-mapbox"
    }

    const viewAddedPhotos = this.state.photoPath.map((path, idx) => {
        return (
          <div key={idx} className={userImage}>
             <img key={idx} src={path} alt=""/>
           </div>
         )
    })

    return (
      <div className={addBox}>
        <div className={searchBox}>
          <div className={mapBox}>
            <AddMap type={"playground"}/>
          </div>
          <div className={currentLocation}>
            <div className={buttonBox}>
              <button onClick={this.findLoc} id={btn} className="btn" type="button">Get Current Location?</button>
            </div>
          </div>
        </div>
        <div className={addForm}>
          <form onSubmit={e=>this.submitHandler(e)}className="sign-up-form">
          <input
            name="pgName"
            className={inputs}
            value={this.state.pgName}
            placeholder="Playground Name"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
          <input
            name="pgLocation"
            className={inputs}
            value={this.state.pgLocation}
            placeholder="Playground Location"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
          {this.state.checkAddress && <p className={"check-addy"}> Please Ensure Address Location Is Correct </p>}
          <textarea
            name="pgDescription"
            className={inputs}
            id="pg-desc"
            value={this.state.pgDescription}
            placeholder="Playground Description"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
          <div className={buttons}>
            <p>Type: </p>
            <div className={eachButton}>
              <input
              type="radio"
              value="public"
              name="businessType"
              checked={this.state.businessType==="public"}
              onChange={e=>this.changeHandler(e)}/>
              Public
            </div>
            <div className={eachButton}>
              <input
              type="radio"
              value="business"
              name="businessType"
              checked={this.state.businessType==="business"}
              onChange={e=>this.changeHandler(e)}/>
              Business
            </div>
          </div>
          <div className={buttons}>
            <p>Bathrooms: </p>
            <div className={eachButton}>
              <input
              type="radio"
              value="no"
              name="bathroom"
              checked={this.state.bathroom==="no"}
              onChange={e=>this.changeHandler(e)}/>
              No
            </div>
            <div className={eachButton}>
              <input
              type="radio"
              value="yes"
              name="bathroom"
              checked={this.state.bathroom==="yes"}
              onChange={e=>this.changeHandler(e)}/>
              Yes
            </div>
          </div>
          <div id={addPic} className={buttons}>
            <p>Upload Pictures: </p>
            <input
            id={picInput}
            type="file"
            className={inputs}
            onChange={this.fileHandler}
            />
          </div>
          <div className={buttonBox}>
            <button  id={btn} className="btn" type="submit">Add Playground</button>
          </div>
          </form>
          {this.state.photoPath.length > 0 &&
            <div className={photoBox}>
              {viewAddedPhotos}
            </div>
          }

        </div>

      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=> {
  return({
    addCoords: (body) => dispatch(addCoordinates(body))
  })
}

export default connect(null, mapDispatchToProps)(AddPlayground)
