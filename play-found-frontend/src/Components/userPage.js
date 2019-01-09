import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from "react-device-detect";
import { getUserContent, showUserPlayground, deleteUserReview, deleteUserBathroom, addCoordinates} from '../actions/actions'
// import PlaygroundCard from '../Components/playgroundCard'


class UserPage extends Component {
  state = {
    review: {},
    bathroom: {}
  }

  componentDidMount() {
    if (localStorage.token !== undefined && this.props.userHasContent === false) {
      this.props.userContent(this.props.user)
    }
    this.props.closeReview()
    this.props.closeBathroom()
  }

  componentDidUpdate() {
    if (localStorage.token !== undefined && this.props.userHasContent === false) {
      this.props.userContent(this.props.user)
    }
  }

  editClick =(obj)=> {
    if (obj.object_type === "review") {
      this.props.showReview(obj)
      this.props.history.push('/review/edit')
    } else if (obj.object_type === "bathroom") {
      let body = {}
      body.lat = parseFloat(obj.coordinates[0].lat)
      body.lng = parseFloat(obj.coordinates[0].lng)
      this.props.addCoords(body)
      this.props.showBathroom(obj)
      this.props.history.push('/bathroom/edit')
    }
  }

  deleteClick =(obj)=> {
    let check = window.confirm("Are you sure you want to delete this?")
    if (check === true) {
      if (obj.object_type === "review") {
        this.props.closeReview()
        this.props.deleteReview(obj.id, this.props.user.id)
      } else if (obj.object_type === "bathroom") {
        this.props.closeBathroom()
        this.props.deleteBathroom(obj.id, this.props.user.id)
      }
    }
  }

  viewClick =(obj)=> {
    if (obj.object_type === "review") {
      this.props.showReview(obj)
    } else if (obj.object_type === "playground") {
      console.log(obj)
      this.props.cachedFetch(obj.id).then(this.props.history.push("/playgrounds/view"))
    } else if (obj.object_type === "bathroom") {
      this.props.showBathroom(obj)
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
        <div className="pg-card2" key={idx} >
          <p className="card-title-line">{pg.name}</p>
          <div className="user-edit" id="view-edit" onClick={()=>this.viewClick(pg)}><p>View</p></div>
          <p>{pg.address}</p>
        </div>
      )
    })

    const showBathrooms = this.props.userBathrooms.map((br, idx)=> {
      return(
        <div className="pg-card2" key={idx} >
          <p className="card-title-line">{br.name}</p>
            <div className="user-edit" id="view-edit" onClick={()=>this.viewClick(br)}><p>View</p></div>
          <p>{br.address}</p>

        </div>
      )
    })

    const showReviews = this.props.userReviews.map((rv, idx)=> {
          return (
            <div className="pg-card2" key={idx}>
              <p className="card-title-line">{rv.title}</p>
                <div className="user-edit" id="view-edit" onClick={()=>this.viewClick(rv)}><p>View</p></div>
              <p>{rv.playground_name}</p>
            </div>
          )
        })

    const ShowBathroom =()=> {
      let br = this.props.bathroom
      const showImages = br.photos.map((p, idx) => {
        return (
          <div className="tiny-br-photo" key={idx}>
            <img src={p} alt=""/>
          </div>
        )
      })
      return (
        <div className="big-image">
          <div className="big-br-div">
            <div id="br-closer" onClick={this.props.closeBathroom} className="big-image-close">
              <p>X</p>
            </div>
            <div className="br-info">
              <h5> Bathroom Details </h5>
              <h4>{br.name}</h4>
              <div id="br-modal" className="user-update">
                <div id="br-modal-edit"className="user-edit" onClick={()=>this.editClick(br)}><p>Edit</p></div>
                <div id="br-modal-delete" className="user-edit" onClick={()=>this.deleteClick(br)}><p>Delete</p></div>
              </div>
              <p>{br.address}</p>
              <p>Business Type: {br.business_type}</p>
              <p>Changing Table: {br.changing_table}</p>
              <p>{br.description}</p>
            </div>
            <div className="br-modal-pic-div">
              {showImages}
            </div>
          </div>

        </div>
      )
    }

    const ShowReview =()=> {
      let r = this.props.review
      return (
        <div className="big-image">
          <div className="big-br-div">
            <div id="br-closer" onClick={this.props.closeReview} className="big-image-close">
              <p>X</p>
            </div>
            <div className="br-info">
              <h5>Playground Review</h5>
              <p>Playground: {r.playground_name}</p>
              <h4>{r.title}</h4>
              <div id="br-modal" className="user-update">
                <div id="br-modal-edit" className="user-edit" onClick={()=>this.editClick(r)}><p>Edit</p></div>
                <div id="br-modal-delete" className="user-edit" onClick={()=>this.deleteClick(r)}><p>Delete</p></div>
              </div>
              <p> Description: </p>
              <div id="user-review-div">
                <p>{r.description}</p>
              </div>
            </div>

          </div>
        </div>
      )
    }

    return (
      <div className={userPage}>
      {Object.keys(this.props.bathroom).length > 0 && <ShowBathroom />}
      {Object.keys(this.props.review).length > 0 && <ShowReview />}
        <div className={nameBox}>
          <h3> Hi! {this.props.user.username}</h3>
        </div>
        <div className={usersItems}>
          <div className={displayBox}>
          Your Reviews
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
      userBathrooms: state.userBathrooms,
      bathroom: state.viewBathroom,
      review: state.viewReview
    }
  }

  const mapDispatchToProps =(dispatch)=> {
    return {
      userContent: (body) => dispatch(getUserContent(body)),
      cachedFetch: (id) => dispatch(showUserPlayground(id)),
      closeBathroom: () => dispatch({type: "CLOSE_BATHROOM", payload: {}}),
      showBathroom: (obj) => dispatch({type: "SHOW_USER_BATHROOM", payload: obj}),
      showReview: (obj)=> dispatch({type: "SHOW_USER_REVIEW", payload: obj}),
      closeReview: () => dispatch({type: "CLOSE_REVIEW", payload: {}}),
      deleteReview: (review_id, user_id)=> dispatch(deleteUserReview(review_id, user_id)),
      deleteBathroom: (bathroom_id, user_id)=> dispatch(deleteUserBathroom(bathroom_id, user_id)),
      addCoords: (body) => dispatch(addCoordinates(body)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
