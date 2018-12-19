import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";

class SelectedPlayground extends Component {

  render(){
    let pg = Object.assign({}, this.props.pg.result)
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
    let photos = pg.photos.map(p => {
      let image = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + p.photo_reference + "&key=" + API_KEY
      return (
        <div className={imageDiv}>
        <img src={image} alt=""/>
        </div>
      )
    })
    let link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=&destination_place_id=" + pg.place_id
// {photos}
    return(
      <div className={pgBox}>
      {console.log(pg)}
        <div className={titleBox}>
          <h3>{pg.name}</h3>
          <h4>{pg.formatted_address}</h4>
          <a href={link}>Directions</a>
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

const mapStateToProps =(state)=> {
    return {
        pg: state.selectedPlayground,
        coords: state.coords
    }
}

export default connect(mapStateToProps)(SelectedPlayground)
