import React, { Component } from 'react'
import { isMobile } from "react-device-detect";
import { connect } from 'react-redux';
import { addReview } from '../actions/actions'

class AddReview extends Component {

  state = {
    title: "",
    description: ""
  }


  changeHandler =(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler =(e)=> {
    e.preventDefault()
    let id
    let name
    if (this.props.playground.bathroom) {
      id = this.props.playground.id
      name = this.props.playground.name
    } else if (this.props.playground.result) {
      id = this.props.playground.result.id
      name = this.props.playground.result.name
    }

      if (localStorage.token  !== undefined && this.props.user.id !== undefined  && id !== undefined ) {
      let review ={
        title: this.state.title,
        description: this.state.description,
        user_id: this.props.user.id,
        playground_id: id,
        playground_name: name
      }
      console.log(review)
      this.props.addThisReview(review)
      this.props.history.push('/playgrounds/view')
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
      if (this.props.playground.bathroom) {
        name = this.props.playground.name
        address = this.props.playground.address
      } else if (this.props.playground.result) {
        name = this.props.playground.result.name
        address = this.props.playground.result.formatted_address
      }


      return (
        <div>
        {Object.keys(this.props.playground).length > 0 &&
          <div id="rev-add-box" className={addBox}>
          <div className="review-box">
            <h3>{name}</h3>
            <h4>{address}</h4>
          </div>
        </div>
      }
        <div className={addRevFormBox}>
          <form onSubmit={(e)=>this.submitHandler(e)} className={revForm}>
            <input onChange={this.changeHandler} id="review-form-input" className="form-inputs" value={this.state.title} name="title" placeholder="Playground Review Title"/>
            <textarea onChange={this.changeHandler} id="review-form-textarea" className="form-inputs" value={this.state.description} name="description" placeholder="Playground Review"/>
            <div id="review-form-button" className={buttonBox}>
              <button  id={btn} className="btn review-btn " type="submit">Add Review</button>
            </div>
          </form>
        </div>
        </div>

      )
  }
}

const mapStateToProps =(state)=> {
  return {
    playground: state.selectedPlayground,
    user: state.user,
    status: state.reviewAdded
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    addThisReview: (review)=>dispatch(addReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
