import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from "react-router-dom";
import { getUser } from '../actions/actions'
import NavBar from '../Components/navBar'
import PlaygroundContainer from './playgrounds'
import LogIn from '../Components/login'
import SignUp from '../Components/signup'
import Index from '../Components/index'
import AddBathroom from '../Components/addBathroom'
import AddPlayground from '../Components/addPlayground'
import AddReview from '../Components/addReview'
import SelectedPlayground from '../Components/selectedPlayground'
import PlaygroundResults from '../Components/playgroundResults'


class Landing extends Component {
  componentDidMount() {
    if (localStorage.token && Object.keys(this.props.user).length < 1) {
      this.props.getUser(localStorage.token)
    }
  }

  render(){
    return(
      <div className="top-level">
      <NavBar />
        <div className="landing-container">
          <Switch>
            <Route exact path="/" component={PlaygroundContainer}/>
            <Route path='/playgrounds/search/results' component={PlaygroundResults}/>
            <Route path='/playgrounds/view' component={SelectedPlayground} />
            <Route path='/playgrounds' component={PlaygroundContainer}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/addbathroom' component={AddBathroom}/>
            <Route path='/addplayground' component={AddPlayground}/>
            <Route path='/addreview' component={AddReview}/>
            <Route path='/userprofile' component={Index}/>
          </Switch>
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

const mapDispatchToProps =(dispatch)=> {
  return {
    getUser: (token) => dispatch(getUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))
