import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux';
import AddMap from './addMap'
import { addCoordinates, userAddPlayground } from '../actions/actions'

class AddPlayground extends Component {
  state = {
    pgName: "",
    pgLocation: "",
    pgDescription: "",
    businessType:"",
    bathroom: "no",
    photos: [],
    photoPath: [],
    lat: "",
    long: "",
    checkAddress: false,
    icon: false
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
    let pgBody ={
      user_id: this.props.user.id,
      coordinates: this.props.coords,
      bathroom: this.state.bathroom,
      business_type: this.state.businessType,
      photos: this.state.photoPath,
      name: this.state.pgName,
      address: this.state.pgLocation,
      description: this.state.pgDescription,
    }
    console.log(pgBody)
    this.props.addThisPlayground(pgBody)
  }

  changeAddyStatus =()=> {
    if (this.state.checkAddress) {
      this.setState({checkAddress: false})
    } else {
      this.setState({checkAddress: true}, ()=>this.confirmAddress())
    }
  }

  confirmAddress =()=> {
      let coords = {}
      let newAddy = this.state.pgLocation.replace(/,/g, "").replace(/ /g, ",")
      let url = "http://www.mapquestapi.com/geocoding/v1/address?key="+ process.env.REACT_APP_MAPQUEST_API_KEY  +"&location=" + newAddy
      fetch(url)
      .then(res => res.json())
       .then(res =>
       {
        if (res.status > 0) {
          alert("No results found, please try again")
        } else  {
          coords.lat = res.results[0].locations[0].latLng.lat
          coords.lng = res.results[0].locations[0].latLng.lng
          this.props.addCoords(coords)
        }
      })
  }

  getAddress =()=> {
    let url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + process.env.REACT_APP_MAPQUEST_API_KEY + "&location=" + this.props.coords.lat +","+ this.props.coords.lng +"&includeRoadMetadata=true&includeNearestIntersection=true"
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
          pgLocation: address,
          icon: true
        })
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.state.photos.length > 0 && this.state.photoPath.length < this.state.photos.length){
      this.state.photos.map(photo => {
        let reader  = new FileReader()
        reader.readAsDataURL(photo)
        return reader.onloadend =()=> {
          if (!this.state.photoPath.includes(reader.result)) {
            return this.setState({photoPath: [...this.state.photoPath, reader.result]})
          }
        }
      })
    }
  }

  render(){
    let icon
    if (this.state.icon === false) {
      icon = "kid"
    } else {
      icon = "playground"
    }
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
          <p>Drag The Pin To The Correct Location OR Enter An Address</p>
          <div className={mapBox}>
            <AddMap type={icon}/>
          </div>
          <div className={currentLocation}>
          {this.props.coords.lat &&
            <div className={buttonBox}>
              <button onClick={this.getAddress} id={btn} className="btn" type="button">Is Playground The Location Of The Pin?</button>
            </div>
          }
          </div>
        </div>
        <div onSubmit={e=>this.submitHandler(e)} className={addForm}>
          <form className="sign-up-form">
          <input
            name="pgName"
            className={inputs}
            value={this.state.pgName}
            placeholder="Playground Name"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
          <p className={"check-addy"}> Please Ensure Address Is Correct </p>
          <input
            name="pgLocation"
            className={inputs}
            value={this.state.pgLocation}
            placeholder="Playground Location"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
        {this.state.pgLocation.length > 5  &&  <div><input className="checker-input" onChange={this.changeAddyStatus} type="checkbox" name="checkAddress"/> <p className="checker"> Check To Use This Address </p></div>}
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
            <div className="box-holder">
              {this.state.photoPath.length > 0 &&
                <div className={photoBox}>
                  {viewAddedPhotos}
                </div>
              }
            </div>


        </div>

      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    coords: state.coords,
    user: state.user
  }
}

const mapDispatchToProps =(dispatch)=> {
  return({
    addCoords: (body) => dispatch(addCoordinates(body)),
    addThisPlayground: (body)=> dispatch(userAddPlayground(body))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayground)
