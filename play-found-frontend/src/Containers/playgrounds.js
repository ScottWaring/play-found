import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import FindPlaygrounds from '../Components/findPlayground'

class PlaygroundContainer extends Component {


  render(){
    return(
      <div>
        <FindPlaygrounds />
      </div>
    )
  }
}



export default withRouter(PlaygroundContainer)
