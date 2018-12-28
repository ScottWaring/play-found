import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findPlaceGoogle, showUserPlayground } from '../actions/actions'
import { withRouter } from "react-router-dom";

class PlaygroundCard extends Component {
  viewPg =(id, type)=> {
    if (type === "user"){this.props.cachedFetch(id).then(this.props.history.push("/playgrounds/view"))}
    if (type === "google"){this.props.googleFetch(id).then(this.props.history.push("/playgrounds/view"))}
  }


  render() {
    let pg = this.props.pg
    let id
    let type
    let name
    let address
    if (pg.place_id !== undefined) {
      id = pg.place_id
      name = pg.name
      address = pg.vicinity
      type = "google"
    } else {
      id = pg.id
      name = pg.name
      address = pg.address
      type = "user"
    }
    return (
      <div className="pg-card bounce"  onClick={()=>this.viewPg(id, type)}>
        <h3>{name}</h3>
        <p>{address}</p>
        {console.log(pg.photos)}
      </div>
    )
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    googleFetch: (id)=> dispatch(findPlaceGoogle(id)),
    cachedFetch: (id)=> dispatch(showUserPlayground(id))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PlaygroundCard))
