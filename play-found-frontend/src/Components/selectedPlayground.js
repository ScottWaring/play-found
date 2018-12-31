import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

class SelectedPlayground extends Component {
    state = {
      reviews: [],
      displayImage: false,
      image: ""
    }

    expandImage =(image)=> {
      this.setState({displayImage: true, image: image})
    }

    closeImage =()=> {
      this.setState({displayImage: false, image: ""})
    }

    render(){
      if (!this.props.pg.result) {
        return(
          <div className="selected-pg-error-box">
          ....standby<br/>
          if nothing happens, then something broke...<br/>
          <Link to="/playgrounds">Take Me Home!</Link><br/>
          </div>
        )
      }
      else {
        let play = Object.assign({}, this.props.pg.result)
        let API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
        let pgBox
        let titleBox
        let photoBox
        let imageDiv
        if (isMobile){
          pgBox = "render-playground-mobile"
          titleBox = "pg-title-box-mobile"
          photoBox = "pg-photo-box-mobile"
          imageDiv = "image-div-mobile"
        } else {
          pgBox = "render-playground"
          titleBox = "pg-title-box"
          photoBox = "pg-photo-box grid"
          imageDiv = "image-div"
        }

        let link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=&destination_place_id=" + play.place_id

        const renderReviews = this.state.reviews.map((r, idx) => {
          return (
            <div key={idx} className="review-card">
              <p>{r.title}</p>
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
          {this.state.displayImage === true && <ShowImage/>}
            <div className={titleBox}>
              <div className="title-div">
                <h3>{play.name}</h3>
              </div>
              <div className="address-div">
                <h4>{play.formatted_address}</h4>
              </div>
              <div className="link-wrapper">
                <div className="add-review-link">
                  <Link to='/addReview'>Add Review</Link>
                </div>
                <div className="website-link">
                  {play.website && <a href={play.website}>Website</a>}
                </div>
                <div className="directions-link">
                  <a href={link}>Directions</a>
                </div>

              </div>
            </div>
            <div className={photoBox}>
              {play.photos === undefined ? "This Playground Has No Photos Yet" :  play.photos.map((p,idx) => {
                let image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + p.photo_reference + "&key=" + API_KEY
                return (
                  <div onClick={()=>this.expandImage(image)} key={idx} className={imageDiv}>
                    <img key={idx} className="pg-image" src={image} alt=""/>
                  </div>
                )
              })}
            </div>
            <div className="reviews-box">
              <p> Play, Found! User Reviews</p>
              <div className="render-reviews">
              {this.state.reviews.length === 0 ? <p> This Playground has no reviews yet</p> : renderReviews }
              </div>
            </div>
          </div>
        )
      }
  }
}


const mapStateToProps =(state)=> {
  return {
    pg: state.selectedPlayground,
    coords: state.coords
  }
}

export default connect(mapStateToProps)(SelectedPlayground)
