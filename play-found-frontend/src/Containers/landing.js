import React, { Component } from 'react';
import { connect } from 'react-redux'
import Index from '../Components/index'
import { Route, Switch } from "react-router-dom";
import PlaygroundContainer from './playgrounds'
import LogIn from '../Components/login'
import SignUp from '../Components/signup'
import AddBathroom from '../Components/addBathroom'
import AddPlayground from '../Components/addPlayground'
import AddReview from '../Components/addReview'


class Landing extends Component {
  render(){
    return(
      <div className="landing-container">
        <Switch>
          <Route exact path='/' component={Index}/>
          <Route path='/playgrounds' component={PlaygroundContainer}/>
          <Route path='/login' component={LogIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/addbathroom' component={AddBathroom}/>
          <Route path='/addplayground' component={AddPlayground}/>
          <Route path='/addreview' component={AddReview}/>
        </Switch>
      
      </div>
    )
  }
}

export default connect()(Landing)
