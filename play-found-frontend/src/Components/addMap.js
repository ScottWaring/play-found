import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { renderPg } from '../actions/actions'

class AddMap extends Component {
    state = {
      latitude: "",
      longitude: "",
      checkAgain: true
    }
      componentDidUpdate() {
         let body = {}
         new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                body.long = position.coords.longitude;
                body.lat = position.coords.latitude;
                resolve(body)
             }
           )}, 200).then((body)=>{
             this.setState({ latitude: body.lat, longitude: body.long, checkAgain: false })
          })
       let zoomIn
       if (isMobile) {
         zoomIn = 14
       } else {
         zoomIn = 15
       }
       let coords
       if (this.props.lat === undefined){
         coords = {lng: this.state.longitude, lat: this.state.latitude}
       } else {
         coords = {lng: this.props.long, lat: this.props.lat}
       }
       const map = new window.google.maps.Map(document.getElementById('map'), {
         center: coords,
         zoom: zoomIn
       });
      let flag
      if (this.props.type === "playground" && this.props.lat !== undefined) {
        flag = {
          url: require("../assets/pin-icon-playground-green.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      } else if (this.props.type === "bathroom" && this.props.lat !== undefined) {
        flag = {
          url: require("../assets/pin-icon-bathroom-green-blue.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      } else {
        flag = {
          url: require("../assets/pin-icon-gap-toothed-kid-blue.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      }

      new window.google.maps.Marker({
        position: coords,
        map: map,
        icon: flag
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
    lat: state.coords.lat,
    long: state.coords.long
    })
}

const mapDispatchToProps =(dispatch)=> {
  return({
    renderPg: (pg) => dispatch(renderPg(pg))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMap)
