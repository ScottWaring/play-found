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
    return (
      <div>
      {this.props.playgrounds.length === 0 ?
        <div className={awaitingResults}>
          <div className={loaderDiv}></div>
          <div className={loaded}></div>
        </div>
      :
        <div>
          <div className={mapName}>
            <Map/>
          </div>
          <div className={playgroundName}>
          {console.log(this.props.playgrounds)}
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
    playgrounds: state.playgrounds
  }
}



export default withRouter(connect(mapStateToProps)(PlaygroundResults))
