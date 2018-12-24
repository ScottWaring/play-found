import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";


class Map extends Component {

  componentDidMount() {
    let zoomIn
    if (isMobile) {
      zoomIn = 14
    } else {
      zoomIn = 15
    }
    console.log("map")
    let coords = { lat: this.props.lat, lng: this.props.long }

     const map = new window.google.maps.Map(document.getElementById('map'), {
       center: coords,
       zoom: zoomIn
     });
    let flag = {
      url: require("../assets/pin-icon-smiling-kid-blue.png"),
      scaledSize: new window.google.maps.Size(50, 50)
    }
    new window.google.maps.Marker({
      position: coords,
      map: map,
      icon: flag
    })
    let pgIcon = {
      url: require("../assets/pin-icon-playground-green.png"),
      scaledSize: new window.google.maps.Size(50, 50)
    }
    this.props.playgrounds.map(pg => {
      return new window.google.maps.Marker({
        position: pg.geometry.location,
        map: map,
        title: pg.name,
        icon: pgIcon
      })
    })
   }
   render() {
     return (
       <div id="map"/>
     );
   }
}

const mapStateToProps =(state)=> {
  return ({
    playgrounds: state.playgrounds,
    lat: state.coords.lat,
    long: state.coords.long
    })
}


export default connect(mapStateToProps)(Map)
