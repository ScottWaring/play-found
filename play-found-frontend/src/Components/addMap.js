import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";
import { addCoordinates } from '../actions/actions'

class AddMap extends Component {

    componentDidMount() {
        let coords = {}
        new Promise(function(resolve, reject) {
          navigator.geolocation.getCurrentPosition(function success(position) {
              coords.lng = position.coords.longitude;
              coords.lat = position.coords.latitude;
              resolve(coords)
           }
         )}, 200)
         .then((coords)=>this.props.addCoordinates(coords))
         console.log("add map")
      }

    componentDidUpdate() {

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

      let flag
      if (this.props.type === "playground") {
        flag = {
          url: require("../assets/pin-icon-playground-green.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      } else if (this.props.type === "bathroom") {
        flag = {
          url: require("../assets/pin-icon-bathroom-green-black.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      } else if (this.props.type === "kid") {
        flag = {
          url: require("../assets/pin-icon-smiling-kid-blue.png"),
          scaledSize: new window.google.maps.Size(50, 50)
        }
      }

      let marker = new window.google.maps.Marker({
        position: this.props.coords,
        draggable: true,
        map: map,
        icon: flag,
      })

      marker.addListener('dragend', (evt) => {
        let coords = {lng: parseFloat(evt.latLng.lng().toFixed(7)), lat: parseFloat( evt.latLng.lat().toFixed(7))}
        return this.addCoords(coords)
      })

    }

    addCoords = (coords) => {
      this.props.addCoordinates(coords)
    }

    render() {
     return (
       <div id="map"/>
     );
   }
}

const mapStateToProps =(state)=> {
  return ({
    coords: state.coords,
    })
}

const mapDispatchToProps =(dispatch)=> {
  return({
    addCoordinates: (coords) => dispatch(addCoordinates(coords))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMap)
