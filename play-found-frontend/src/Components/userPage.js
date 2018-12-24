import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";
import { getUserContent } from '../actions/actions'
import PlaygroundCard from '../Components/playgroundCard'


class UserPage extends Component {

  componentDidMount() {
    if (localStorage.token !== undefined && this.props.userHasContent === false) {
      this.props.userContent(this.props.user)
    }
  }

  componentDidUpdate() {
    if (localStorage.token !== undefined && this.props.userHasContent === false) {
      this.props.userContent(this.props.user)
    }
  }

  render(){
    let userPage
    let nameBox
    let usersItems
    let displayBox
    if (isMobile){
      userPage = "user-page-mobile"
      nameBox = "user-name-box-mobile"
      usersItems = "user-item-box-mobile"
      displayBox = "user-display-box-mobile"

    } else {
      userPage = "user-page"
      nameBox = "user-name-box"
      usersItems = "user-item-box"
      displayBox = "user-display-box"

    }

    const showPlaygrounds = this.props.userPlaygrounds.map((pg, idx)=> {
      return(
      <PlaygroundCard key={idx} pg={pg} />
      )
    })

    const showBathrooms = this.props.userBathrooms.map((br, idx)=> {
      return(
        <div className="pg-card bounce" key={idx}>
        {br.name}
        {br.address}
        </div>
      )
    })

    const showReviews = this.props.userReviews.map((rv, idx)=> {
          return (
            <div className="pg-card bounce" key={idx}>
              <p>{rv.title}</p>
              <p>{rv.description}</p>
            </div>
          )
        })

    return (
      <div className={userPage}>
        <div className={nameBox}>
          <h3> HI! {this.props.user.username}</h3>
        </div>
        <div className={usersItems}>
          <div className={displayBox}>
          Your Reviews
          {console.log(this.props)}
            <div className="inner-user-display-box">
            {this.props.userReviews.length > 0 && showReviews}
            </div>
          </div>
          <div className={displayBox}>
          Your Playgrounds
            <div className="inner-user-display-box">
            {this.props.userPlaygrounds.length > 0 && showPlaygrounds}
            </div>
          </div>
          <div className={displayBox}>
          Your Bathrooms
            <div className="inner-user-display-box">
          {this.props.userBathrooms.length > 0 && showBathrooms}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  const mapStateToProps =(state)=> {
    return {
      user: state.user,
      userHasContent: state.userHasContent,
      userReviews: state.userReviews,
      userPlaygrounds: state.userPlaygrounds,
      userBathrooms: state.userBathrooms
    }
  }

  const mapDispatchToProps =(dispatch)=> {
    return {
      userContent: (body) => dispatch(getUserContent(body))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
