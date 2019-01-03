import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect"
import Map from '../Components/map'
import PlaygroundCard from '../Components/playgroundCard'
import { withRouter } from "react-router-dom";

class PlaygroundResults extends Component {


  render(){
    let mapName
    let playgroundName
    let awaitingResults
    let loaded
    let loaderDiv
    if (isMobile) {
      mapName = "map-box-mobile"
      playgroundName = "playgrounds-scroll-box-mobile"
      awaitingResults = "awaiting-results-box-mobile"
      loaded ="loader-mobile"
      loaderDiv = "image-loader-mobile"
    } else {
      mapName = "map-box"
      playgroundName = "playgrounds-scroll-box"
      awaitingResults = "awaiting-results-box"
      loaded ="loader"
      loaderDiv = "image-loader"
    }

    const ShowBathroom =()=> {
      let link = "https://www.google.com/maps/dir/?api=1&origin=" + this.props.coords.lat + "," + this.props.coords.long + "&destination=" + this.props.bathroom.coordinates[0].lat + ","+ this.props.bathroom.coordinates[0].lng
      let br = this.props.bathroom
      const showImages = br.photos.map((p, idx) => {
        return (
          <div className="tiny-br-photo" key={idx}>
            <img src={p} alt=""/>
          </div>
        )
      })
      return (
        <div className="big-image">
          <div className="big-br-div">
            <div id="br-closer" onClick={this.props.closeBathroom} className="big-image-close">
              <p>X</p>
            </div>
            <div className="br-info">
              <h4>{br.name}</h4>
              <div className="directions-link">
                <a href={link}  target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
              <p>{br.address}</p>
              <p>Business Type: {br.business_type}</p>
              <p>Changing Table: {br.changing_table}</p>
              <p>{br.description}</p>
            </div>
            <div className="br-modal-pic-div">
              {showImages}
            </div>
          </div>
        </div>
      )
    }


    return (
      <div>
      {this.props.show === false ?
        <div className={awaitingResults}>
          <div className={loaderDiv}></div>
          <div className={loaded}></div>
        </div>
      :
        <div>
        {this.props.bathroom.id !== undefined && <ShowBathroom />}
          <div className={mapName}>
            <Map/>
          </div>
          <div className={playgroundName}>
            {this.props.playgrounds.map((pg, idx) => <PlaygroundCard key={idx} pg={pg}/>)}
          </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    playgrounds: state.playgrounds,
    show: state.renderPlaygroundResults,
    bathroom: state.viewBathroom,
    coords: state.coords
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    closeBathroom: () => dispatch({type: "CLOSE_BATHROOM", payload: {}})
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaygroundResults))
