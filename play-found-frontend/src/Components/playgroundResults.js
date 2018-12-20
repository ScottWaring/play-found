import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect"
import { findPlaceGoogle } from '../actions/actions'
import Map from '../Components/map'
import PlaygroundCard from '../Components/playgroundCard'
import { withRouter } from "react-router-dom";

class PlaygroundResults extends Component {
  viewPg =(id)=> {
    this.props.findPlace(id)
    this.props.history.push("/playgrounds/view")
  }

  render(){
    let mapName
    let playgroundName
    let awaitingResults
    if (isMobile) {
      mapName = "map-box-mobile"
      playgroundName = "playgrounds-scroll-box-mobile"
      awaitingResults = "awaiting-results-box-mobile"
    } else {
      mapName = "map-box"
      playgroundName = "playgrounds-scroll-box"
      awaitingResults = "awaiting-results-box"
    }
    return (
      <div>
      {this.props.playgrounds.length === 0 ?
        <div className={awaitingResults}>
          <div className="loader"></div>
        </div>
      :
        <div>
          <div className={mapName}>
            <Map/>
          </div>
          <div className={playgroundName}>
          {console.log(this.props.playgrounds)}
            {this.props.playgrounds.map((pg, idx) => <PlaygroundCard key={idx} pg={pg} viewPg={this.viewPg}/>)}
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

const mapDispatchToProps =(dispatch)=> {
  return {
    findPlace: (id)=> dispatch(findPlaceGoogle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaygroundResults))
