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
    console.log(localStorage.token,this.props.user.id,this.props.playground.result.id)
    e.preventDefault()
      if (localStorage.token  !== undefined && this.props.user.id !== undefined  && this.props.playground.result.id !== undefined ) {
      let review ={
        title: this.state.title,
        description: this.state.description,
        user_id: this.props.user.id,
        playground_id: this.props.playground.result.id
      }
      this.props.addThisReview(review)
    }
  }

  render(){

      let addBox
      let addRevFormBox
      let revForm
      let buttonBox
      let btn
      if (isMobile) {
        addBox = "add-box-mobile"
        addRevFormBox = "add-review-form-box-mobile"
        revForm = "add-review-form-mobile"
        buttonBox = "add-button-box-mobile"
        btn = "add-button-mobile"
      } else {
        addBox = "add-box"
        addRevFormBox = "add-review-form-box"
        revForm = "add-review-form"
        buttonBox = "add-button-box"
        btn = "add-button"
      }


      return (
        <div>
        {this.props.playground.result &&
          <div id="rev-add-box" className={addBox}>
          <div className="review-box">
            <h3>{this.props.playground.result.name}</h3>
            <h4>{this.props.playground.result.formatted_address}</h4>
          </div>
        </div>
      }
        <div className={addRevFormBox}>
          <form onSubmit={(e)=>this.submitHandler(e)} className={revForm}>
            <input onChange={this.changeHandler} id="review-form-input" className="form-inputs" value={this.state.title} name="title" placeholder="Playground Review Title"/>
            <textarea onChange={this.changeHandler} id="review-form-textarea" className="form-inputs" value={this.state.description} name="description" placeholder="Playground Review"/>
            <div id="review-form-button" className={buttonBox}>
              <button  id={btn} className="btn" type="submit">Add Review</button>
            </div>
          </form>
          {console.log(this.state)}
        </div>
        </div>

      )
  }
}

const mapStateToProps =(state)=> {
  return {
    playground: state.selectedPlayground,
    user: state.user
  }
}

const mapDispatchToProps =(dispatch)=> {
  return {
    addThisReview: (review)=>dispatch(addReview(review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
