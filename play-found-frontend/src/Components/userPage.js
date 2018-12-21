import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";


class UserPage extends Component {
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
    return (
      <div className={userPage}>
        <div className={nameBox}>
          <h3> HI! {this.props.user.username}</h3>
        </div>
        <div className={usersItems}>
          <div className={displayBox}>
          Your Favorites
            <div className="inner-user-display-box">
            </div>
          </div>
          <div className={displayBox}>
          Your Reviews
            <div className="inner-user-display-box">
            </div>
          </div>
          <div className={displayBox}>
          Your Bathrooms
            <div className="inner-user-display-box">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  const mapStateToProps =(state)=> {
    return {
      user: state.user
    }
  }

export default connect(mapStateToProps)(UserPage)
