import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
class SelectedPlayground extends Component {

    render(){
      if (!this.props.pg.result) {
        return(
          <div>
          ....standby<br/>
          if nothing happens, then something broke...<br/>
          <Link to="/playgrounds">Take Me Home!</Link><br/>
          </div>
        )
      }
      else {
        let play = Object.assign({}, this.props.pg.result)
        console.log(play)
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
          photoBox = "pg-photo-box"
          imageDiv = "image-div"
        }
        let photos = play.photos.map(p => {
          let image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + p.photo_reference + "&key=" + API_KEY
          return (
            <div className={imageDiv}>
              <img key={p.photo_reference} className="pg-image" src={image} alt=""/>
            </div>
          )
        })

        let link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=&destination_place_id=" + play.place_id
        return(
          <div className={pgBox}>
            <div className={titleBox}>
              <div className="title-div">
                <h3>{play.name}</h3>
              </div>
              <div className="address-div">
                <h4>{play.formatted_address}</h4>
              </div>
              <div className="link-wrapper">
                <div className="website-link">
                  {play.website && <a href={play.website}>Website</a>}
                </div>
                <div className="directions-link">
                  <a href={link}>Directions</a>
                </div>
              </div>
              {console.log(link)}
              {console.log(this.props)}
            </div>
            <div className={photoBox}>
              {photos}
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
