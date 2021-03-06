import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isMobile } from "react-device-detect";



class Map extends Component {

  renderBathroomModal(id) {
    this.props.showBathroom(id)
  }

  componentDidUpdate() {
    let zoomIn
    if (isMobile) {
      zoomIn = 14
    } else {
      zoomIn = 15
    }


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
      icon: flag,
      zIndex:100
    })
    let pgIcon = {
      url: require("../assets/pin-icon-playground-green.png"),
      scaledSize: new window.google.maps.Size(50, 50)
    }

    this.props.playgrounds.map(pg => {
      if (pg.geometry){
        return new window.google.maps.Marker({
          position: pg.geometry.location,
          map: map,
          title: pg.name,
          icon: pgIcon
        })
      } else if (pg.coordinates) {
        let pg_coords = {}
        pg_coords.lat = parseFloat(pg.coordinates[0].lat)
        pg_coords.lng = parseFloat(pg.coordinates[0].lng)
        return new window.google.maps.Marker({
          position: pg_coords,
          map: map,
          title: pg.name,
          icon: pgIcon
        })
      }
    })

    let brIcon = {
      url: require("../assets/pin-icon-bathroom-green-black.png"),
      scaledSize: new window.google.maps.Size(50, 50)
    }
    this.props.bathrooms.map(br => {
      let marker = new window.google.maps.Marker({
        position: {lat: parseFloat(br.coordinates[0].lat), lng: parseFloat(br.coordinates[0].lng)},
        map: map,
        title: br.name,
        icon: brIcon,
        id: br.id
      })
      marker.addListener('click', ()=> { this.renderBathroomModal(marker.id)} )
      return marker
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
    long: state.coords.long,
    coords: state.coords,
    bathrooms: state.localBathrooms
    })
}

const mapDispatchToProps =(dispatch)=> {
  return ({
    showBathroom: (id) => dispatch({type: "SHOW_BATHROOM", payload: id})
  })
}




export default connect(mapStateToProps, mapDispatchToProps)(Map)
