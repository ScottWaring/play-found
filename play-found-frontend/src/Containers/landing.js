import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import PlaygroundContainer from './playgrounds'
import LogIn from '../Components/login'
import SignUp from '../Components/signup'
import UserPage from '../Components/userPage'
import AddBathroom from '../Components/addBathroom'
import EditBathroom from '../Components/editBathroom'
import AddPlayground from '../Components/addPlayground'
import EditPlayground from '../Components/editPlayground'
import AddReview from '../Components/addReview'
import EditReview from '../Components/editReview'
import SelectedPlayground from '../Components/selectedPlayground'
import PlaygroundResults from '../Components/playgroundResults'
import { isMobile } from "react-device-detect";


class Landing extends Component {

  render(){
    let landCon
    if (isMobile){
      landCon ="landing-container-mobile"
    } else {
      landCon ="landing-container"
    }
    return(
        <div className={landCon}>
          <Switch>
            <Route path='/playgrounds/search/results' component={PlaygroundResults}/>
            <Route path='/playgrounds/view' component={SelectedPlayground} />
            <Route path='/playgrounds/edit' component={EditPlayground} />
            <Route path='/playgrounds' component={PlaygroundContainer}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/addbathroom' component={AddBathroom}/>
            <Route path='/bathroom/edit' component={EditBathroom}/>
            <Route path='/addplayground' component={AddPlayground}/>
            <Route path='/addreview' component={AddReview}/>
            <Route path='/review/edit' component={EditReview}/>
            <Route path='/userprofile' component={UserPage}/>
            <Route exact path="/" component={PlaygroundContainer}/>
          </Switch>
        </div>
    )
  }
}


export default withRouter(Landing)
