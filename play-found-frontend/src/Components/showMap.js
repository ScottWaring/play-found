import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";

class ShowMap extends Component {

    componentDidMount() {

       let zoomIn
       if (isMobile) {
         zoomIn = 14
       } else {
         zoomIn = 15
       }

       const map = new window.google.maps.Map(document.getElementById('map'), {
         center: this.props.coords,
         zoom: zoomIn
       });

      let flag = {
          url: require("../assets/pin-icon-playground-green.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      let coords = {}
      if (this.props.coords.long !== undefined) {
        console.log(this.props.coords.long)
        coords.lng = this.props.coords.long
        coords.lat = this.props.coords.lat
      } else if (this.props.coords.long === undefined) {
        coords = this.props.coords
      }
      new window.google.maps.Marker({
        position: coords,
        map: map,
        icon: flag,
      }, console.log(this.props.coords, "marker"))
    }

    render() {
     return (
       <div className="show-map" id="map"/>
     );
   }
}

const mapStateToProps =(state)=> {
  return ({
    coords: state.coords,
    })
}

export default connect(mapStateToProps)(ShowMap)
