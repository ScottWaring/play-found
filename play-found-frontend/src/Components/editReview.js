import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux';
import { userEditReview } from '../actions/actions'

class EditReview extends Component {

  state = {
    title: this.props.review.title,
    description: this.props.review.description
  }


  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler =(e)=> {
    e.preventDefault()
      if (localStorage.token  !== undefined && this.props.user.id !== undefined) {
      let review ={
        id: this.props.review.id,
        title: this.state.title,
        description: this.state.description,
        user_id: this.props.review.user_id,
        playground_id: this.props.review.playground_id,
        playground_name: this.props.review.playground_name
      }
      this.props.editThisReview(review)
      this.props.history.push('/userprofile')
    }
  }

  render(){
      let addBox
      let addRevFormBox
      let revForm
      let buttonBox
      let btn
      let name
      let address
      if (isMobile) {
        addBox = "add-box-mobile"
        addRevFormBox = "add-review-form-box-mobile"
        revForm = "add-review-form-mobile"
        buttonBox = "add-button-box-mobile"
        btn = "big-btn"
      } else {
        addBox = "add-box"
        addRevFormBox = "add-review-form-box"
        revForm = "add-review-form"
        buttonBox = "add-button-box"
        btn = "big-btn"
      }

      return (
        <div>

          <div id="rev-add-box" className={addBox}>
          <div className="review-box">
            <h3>Playground Name: {this.props.review.playground_name}</h3>
          </div>
        </div>

        <div className={addRevFormBox}>
          <form onSubmit={(e)=>this.submitHandler(e)} className={revForm}>
            <input onChange={this.changeHandler} id="review-form-input" className="form-inputs" value={this.state.title} name="title" placeholder="Playground Review Title"/>
            <textarea onChange={this.changeHandler} id="review-form-textarea" className="form-inputs" value={this.state.description} name="description" placeholder="Playground Review"/>
            <div id="review-form-button" className={buttonBox}>
              <button  id={btn} className="btn review-btn " type="submit">Update Review</button>
            </div>
          </form>
        </div>
        </div>

      )
  }
}

const mapStateToProps =(state)=> {
  return {
    user: state.user,
    status: state.reviewAdded,
    review: state.viewReview
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    editThisReview: (review)=>dispatch(userEditReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview)
