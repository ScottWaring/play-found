import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux';
import EditMap from './editMap'
import { addCoordinates, userEditBathroom } from '../actions/actions'

class EditBathroom extends Component {
  state = {
    brName: this.props.bathroom.name,
    brLocation: this.props.bathroom.address,
    brDescription: this.props.bathroom.description,
    businessType: this.props.bathroom.business_type,
    changingTable: this.props.bathroom.changing_table,
    photos: [],
    photoPath: this.props.bathroom.photos,
    lat: "",
    long: "",
    checkAddress: true,
    icon: false
  }

  deletePhoto =(photo)=> {
    let newPhotoArr = this.state.photoPath.filter(p => p !== photo)
    this.setState({photoPath: newPhotoArr})
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
    let brBody ={
      id: this.props.bathroom.id,
      user_id: this.props.user.id,
      coordinates: this.props.coords,
      changingTable: this.state.bathroom,
      business_type: this.state.businessType,
      photos: this.state.photoPath,
      name: this.state.brName,
      address: this.state.brLocation,
      description: this.state.brDescription,
      object_type: "bathroom"
    }
    console.log(brBody)
    this.props.editThisBathroom(brBody)
    this.props.history.push('/userprofile')
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
      let newAddy = this.state.brLocation.replace(/,/g, "").replace(/ /g, ",")
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
          brLocation: address,
          icon: true
        })
      }
    })
  }


  componentDidUpdate(prevProps) {
    if (this.state.photos.length > 0){
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
    let icon = "bathroom"
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
      btn = "big-btn"
      buttonBox = "add-button-box"
      currentLocation = "get-current-location"
      mapBox = "add-pg-mapbox"
    }

    const viewAddedPhotos = this.state.photoPath.map((path, idx) => {
        return (
          <div key={idx} className={userImage}>
          <div className="photo-remove" onClick={()=>this.deletePhoto(path)}>X</div>
             <img key={idx} src={path} alt=""/>
           </div>
         )
    })

    return (
      <div className={addBox}>
        <div className={searchBox}>
          <p>Drag The Pin To The Correct Location OR Enter An Address</p>
          <div className={mapBox}>
            <EditMap type={icon}/>
          </div>
          <div className={currentLocation}>
          {this.props.coords.lat &&
            <div className={buttonBox}>
              <button onClick={this.getAddress} id={btn} className="btn" type="button">Is The Bathroom At The Location Of The Pin?</button>
            </div>
          }
          </div>
        </div>
        <div onSubmit={e=>this.submitHandler(e)} className={addForm}>
          <form className="sign-up-form">
          <input
            name="brName"
            className={inputs}
            value={this.state.brName}
            placeholder="Bathroom Name"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
          <p className={"check-addy"}> Please Ensure Address Is Correct </p>
          <input
            name="brLocation"
            className={inputs}
            value={this.state.brLocation}
            placeholder="Bathroom Location"
            type="text"
            onChange={(e)=>this.changeHandler(e)}
          /><br />
        {this.state.brLocation.length > 5  &&  <div><input className="checker-input" onChange={this.changeAddyStatus} type="checkbox" name="checkAddress"/> <p className="checker"> Check To Use This Address </p></div>}
          <textarea
            name="brDescription"
            className={inputs}
            id="pg-desc"
            value={this.state.brDescription}
            placeholder="Brief Bathroom Description"
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
            <p>Changing Table: </p>
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
          <div className="box-holder">
            {this.state.photoPath.length > 0 &&
              <div className={photoBox}>
                {viewAddedPhotos}
              </div>
            }
          </div>
          <div className={buttonBox}>
            <button  id={btn} className="btn" type="submit">Update Bathroom</button>
          </div>
          </form>



        </div>

      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    coords: state.coords,
    user: state.user,
    bathroom: state.viewBathroom
  }
}

const mapDispatchToProps =(dispatch)=> {
  return({
    addCoords: (body) => dispatch(addCoordinates(body)),
    editThisBathroom: (body)=> dispatch(userEditBathroom(body))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBathroom)
