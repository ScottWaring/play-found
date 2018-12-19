import React, { Component } from 'react';
import { connect } from 'react-redux'
import FindPlaygrounds from '../Components/findPlayground'
import Map from '../Components/map'
import PlaygroundCard from '../Components/playgroundCard'
import { isMobile } from "react-device-detect";
import { findPlaceGoogle } from '../actions/actions'
import SelectedPlayground from '../Components/selectedPlayground'

class PlaygroundContainer extends Component {

  viewPg =(id)=> {
    this.props.findPlace(id)
  }

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
          <Map/>
        </div>
        <div className={playgroundName}>
          {this.props.playgrounds.map((pg, idx) => <PlaygroundCard key={idx} pg={pg} viewPg={this.viewPg}/>)}
        </div>
      </div>
    )
  }

  render(){
    return(
      <div>
        { Object.keys(this.props.selectedPlayground).length === 0 ?
          <div className="map-div">
          {this.props.playgrounds.length > 0 ? this.renderPlaygrounds() : <FindPlaygrounds />}
        </div>
        :
        <div className="selected-playground">
          <SelectedPlayground />
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps =(state)=> {
  return {
    playgrounds: state.playgrounds,
    selectedPlayground: state.selectedPlayground
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    findPlace: (id)=> dispatch(findPlaceGoogle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundContainer)
