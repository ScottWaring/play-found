import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <div className="inside-footer-pic-div">
          <img src={require("../assets/transparent-title-logo.png")} alt="" />
        </div>
      </div>
    )
  }
}

export default Footer
