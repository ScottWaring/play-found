import React, { Component } from 'react'
import { isMobile } from "react-device-detect";

class AddReview extends Component {
  render(){
      let addBox
      if (isMobile) {
        addBox = "add-box-mobile"
      } else {
        addBox = "add-box"
      }
      return (
        <div className={addBox}>
        AddPLayground
        </div>
      )
    }
}

export default AddReview
