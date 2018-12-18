import React, { Component } from 'react';
import { connect } from 'react-redux'
import FindPlaygrounds from '../Components/findPlayground'
import Map from '../Components/map'
import PlaygroundCard from '../Components/playgroundCard'
import { isMobile } from "react-device-detect";

class PlaygroundContainer extends Component {

  renderPlaygrounds =()=> {
    let mapName
    let playgroundName
    if (isMobile) {
      mapName = "map-box-mobile"
      playgroundName = "playgrounds-scroll-box-mobile"
    } else {
      mapName = "map-box"
      playgroundName = "playgrounds-scroll-box"
    }
    return (
      <div>
        <div className={mapName}>
          <Map />
        </div>
        <div className={playgroundName}>
          {this.props.playgrounds.map((pg, idx) => <PlaygroundCard key={idx} pg={pg} />)}
        </div>
      </div>
    )
  }

  render(){
    return(
      <div>
        <div className="map-div">
          {this.props.playgrounds.length > 0? this.renderPlaygrounds() : <FindPlaygrounds />}
        </div>
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    playgrounds: state.playgrounds
  }
}

export default connect(mapStateToProps)(PlaygroundContainer)
