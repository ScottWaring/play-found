import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { addCoordinates, getPlaygroundReviews, deleteUserPlayground } from '../actions/actions'
import ShowMap from '../Components/showMap'


class SelectedPlayground extends Component {
    state = {
      reviews: [],
      displayImage: false,
      image: ""
    }

    componentDidMount() {
      let body = {}
      new Promise(function(resolve, reject) {
         navigator.geolocation.getCurrentPosition(function success(position) {
             body.long = position.coords.longitude;
             body.lat = position.coords.latitude;
             resolve(body)
          }
        )}).then((body) => this.props.addCoords(body))
        console.log("edit-playground")
    }


    expandImage =(image)=> {
      this.setState({displayImage: true, image: image})
    }

    closeImage =()=> {
      this.setState({displayImage: false, image: ""})
    }

    editClick =(obj)=> {
      let body = {}
      body.lat = parseFloat(this.props.pg.coordinates[0].lat)
      body.lng = parseFloat(this.props.pg.coordinates[0].lng)
      this.props.addCoords(body)
      this.props.history.push('/playgrounds/edit')
    }

    deleteClick =(obj)=> {
      this.props.deletePlayground(obj.id, this.props.user.id)
      this.props.history.push('/userprofile')
    }


    render(){
      if ( Object.keys(this.props.pg).length === 0) {
        return(
          <div className="selected-pg-error-box">
          ....standby<br/>
          if nothing happens, then something broke...<br/>
          <Link to="/playgrounds">Take Me Home!</Link><br/>
          </div>
        )
      }
      else {
        let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
        let pgBox
        let titleBox
        let photoBox
        let imageDiv
        let link
        let play
        let awaitingResults
        let loaded
        let loaderDiv
        if (isMobile){
          pgBox = "render-playground-mobile"
          titleBox = "pg-title-box-mobile"
          photoBox = "pg-photo-box-mobile"
          imageDiv = "image-div-mobile"
          awaitingResults = "awaiting-results-box-mobile"
          loaded ="loader-mobile"
          loaderDiv = "image-loader-mobile"
        } else {
          pgBox = "render-playground"
          titleBox = "pg-title-box"
          photoBox = "pg-photo-box grid"
          imageDiv = "image-div"
          awaitingResults = "awaiting-results-box"
          loaded ="loader"
          loaderDiv = "image-loader"
        }
        if (this.props.pg.bathroom && Object.keys(this.props.coords).length > 0) {
          play = Object.assign({}, this.props.pg)
          link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=" + this.props.pg.coordinates[0].lat + ","+ this.props.pg.coordinates[0].lng
        } else if (this.props.pg.result && Object.keys(this.props.coords).length > 0) {
          play = Object.assign({}, this.props.pg.result)
          link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=" + play.geometry.location.lat + "," + play.geometry.location.lng
        }
        const renderReviews = this.props.reviews.map((r, idx) => {
          return (
            <div key={idx} className="review-card">
              <p className="rc-title">{r.review.title}</p> <p className="rc-creator"> Created By: {r.created_by}</p>
              <p className="rc-desc">{r.review.description}</p>
            </div>
          )
        })

        const ShowImage =()=> {
          return (
            <div className="big-image">
              <div onClick={this.closeImage} className="big-image-close">
                <p>X</p>
              </div>
              <div className="big-image-div">
                <img className="pg-big-image" src={this.state.image} alt=""/>
              </div>
            </div>
          )
        }

        return(
          <div className={pgBox}>
          { Object.keys(this.props.coords).length === 0 ?
            <div className={awaitingResults}>
              <div className={loaderDiv}></div>
              <div className={loaded}></div>
            </div>
            :
            <div className={titleBox}>
              {this.state.displayImage === true && <ShowImage/>}
              <div className="title-div">
              {play.object_type && <span className="user-added-pg-notice"><p>Play, Found! User Created Playground!</p></span>}
                <h3>{play.name}</h3>
                <div className="address-div">
                  <h4>{play.formatted_address ? play.formatted_address : play.address }</h4>
                </div>
                {play.object_type && <span className="user-added-pg-notice"><p>Bathroom: {play.bathroom}</p></span>}
                {play.object_type && <span className="user-added-pg-notice"><p>Type: {play.business_type}</p></span>}
                { play.user_id === this.props.user.id &&  <div className="user-update">
                    <div className="user-edit" onClick={()=>this.editClick(play)}><p>Edit</p></div>
                    <div className="user-edit" onClick={()=>this.deleteClick(play)}><p>Delete</p></div>
                  </div> }
              </div>

              <div className="link-wrapper">
                <div className="add-review-link">
                  <Link to='/addReview'>Add Review</Link>
                </div>
                <div className="website-link">
                  {play.website && <a href={play.website} rel="noopener noreferrer" target="_blank">Website</a>}
                </div>
                <div className="directions-link">
                  <a href={link} rel="noopener noreferrer" target="_blank">Directions</a>
                </div>
              </div>
              <div className="selected-pg-map-box">
                <ShowMap/>
              </div>
              <div className={photoBox}>
                {play.photos === undefined ?
                  "This Playground Has No Photos Yet"
                  :
                  play.photos.map((p,idx) => {
                    let image
                    if (play.bathroom) {
                      image = p
                    } else {
                      image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + p.photo_reference + "&key=" + API_KEY
                    }
                    return (
                      <div onClick={()=>this.expandImage(image)} key={idx} className={imageDiv}>
                        <img key={idx} className="pg-image" src={image} alt=""/>
                      </div>
                    )
                  })
                }
              </div>
              <div className="reviews-box">
                <p> Play, Found! User Reviews</p>
                <div className="render-reviews">
                {this.props.reviews.length === 0 ? <p> This Playground has no reviews yet</p> : renderReviews }
                </div>
              </div>
            </div>
          }
          </div>
        )
      }
  }
}


const mapStateToProps =(state)=> {
  return {
    pg: state.selectedPlayground,
    reviews: state.selectedPlaygroundReviews,
    user: state.user,
    coords: state.coords
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    addCoords: (body)=> dispatch(addCoordinates(body)),
    getReviews: (id)=> dispatch(getPlaygroundReviews(id)),
    clearOldReviews: ()=> dispatch({type: "CLEAR_OLD_REVIEWS", payload: []}),
    deletePlayground: (playground_id, user_id)=> dispatch(deleteUserPlayground(playground_id, user_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPlayground)
