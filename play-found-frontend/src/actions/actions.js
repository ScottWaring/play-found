const BASE_URL = "http://localhost:3000"
// const BASE_URL = `http://192.168.1.7:3000`


export function callBackEndGoogle(body) {
  return (dispatch) => {
  return fetch(`${BASE_URL}/search`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status === "INVALID_REQUEST") {
        alert(res.status)
      } else {
        dispatch({type: "ADD_PLAYGROUNDS", payload: res})
      }
    })
  }
}

export function findPlaceGoogle(id) {
  let body = {id: id}
  return (dispatch) => {
  return fetch(`${BASE_URL}/search/place` ,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => dispatch({type: "VIEW_PLAYGROUND", payload: res}))
  }
}

export function getUser(token) {
  return (dispatch) => {
  return fetch(`${BASE_URL}/api/v1/profile`,{
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(res => dispatch({type: "GET_USER", payload: res}))
  }
}

export function logUserIn(body) {
  return (dispatch) => {
  return   fetch(`${BASE_URL}/api/v1/login`, {
      method: 'POST',
      headers:{
       'Content-Type': 'application/json',
       'accept': 'application/json'
     },
     body: JSON.stringify({user : body})
   })
   .then(res => res.json())
   .then(res => {
     if (res.status === 200) {
       dispatch({type: "LOG_IN_USER", payload: res})
       return true
     } else {
       alert(res.message)
     }
   })
 }
}

export function logUserOut() {
  return (dispatch) => {
    return dispatch({type: "LOG_USER_OUT", payload: {}})
  }
}

export function addCoordinates(body) {
  return(dispatch)=> {
    return dispatch({type: "ADD_COORDS", payload: body})
  }
}

export function userAddPlayground(body) {
  return(dispatch)=> {
    return   fetch(`${BASE_URL}/api/v1/addplayground`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res=> res.json())
    .then(res => {
      if (res.status === 200) {
        return dispatch({type:"PLAYGROUND_GOOD", payload: res})
      }
    })
  }
}

export function userAddBathroom(body) {
  return(dispatch)=> {
    return   fetch(`${BASE_URL}/api/v1/addbathroom`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res=> res.json())
    .then(res => {
      if (res.status === 200) {
        return dispatch({type:"BATHROOM_GOOD", payload: res})
      }
    })
  }
}

export function addReview(review) {
  return(dispatch)=> {
    return   fetch(`${BASE_URL}/api/v1/addreview`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(res=> res.json())
    .then(res => {
      if (res.status === 200) {
        return dispatch({type:"REVIEW_GOOD", payload: res})
      }
    })
  }
}

export function getUserContent(body) {
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/usercontent`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({user : body})
    })
    .then(res=> res.json())
    .then(res=> {
      if (res.status === 200){
        return dispatch({type:"ADD_USER_CONTENT", payload: res})
      }
    })
  }
}

export function showUserPlayground(id){
  let body = {id: id}
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/getplayground`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({body})
    })
    .then(res=> res.json())
    .then(res=> {
      if (res.status !== 404){
        console.log(res)
        return dispatch({type: "VIEW_PLAYGROUND", payload: res})
      }
    })
  }
}


export function returnLocalBathrooms(coords) {
  console.log(coords.lat)
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/getlocalbathrooms`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coords)
    })
    .then(res=> res.json())
    .then(res=> {
      if (res.status !== 404){
        return dispatch({type: "ADD_LOCAL_BATHROOMS", payload: res})
      }
    })
  }
}

export function getPlaygroundReviews(id) {
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/getreviews`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id})
    })
    .then(res => res.json())
    .then(console.log)
  }
}

export function deleteUserBathroom(bathroom_id, user_id) {
  let body = {bathroom_id: bathroom_id, user_id: user_id}
  console.log(body)
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/delete_bathroom`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(dispatch({type: "REMOVE_BATHROOM", payload: bathroom_id}))
  }
}

export function deleteUserReview(review_id, user_id) {
  let body = {review_id: review_id, user_id: user_id}
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/delete_review`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(dispatch({type: "REMOVE_REVIEW", payload: review_id}))
  }
}

export function deleteUserPlayground(playground_id, user_id) {
  let body = {playground_id: playground_id, user_id: user_id}
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/delete_playground`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(dispatch({type: "REMOVE_PLAYGROUND", payload: playground_id}))
  }
}

export function userEditPlayground(playground) {
  console.log(playground.photos.length)
  let playObj = {id: playground.id, name: playground.name, address: playground.address, object_type: "playground"}
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/edit_playground`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playground)
    })
    .then(dispatch({type: "EDIT_PLAYGROUND", payload: playObj}))
  }
}

export function userEditBathroom(bathroom) {
  // let playObj = {id: playground.id, name: playground.name, address: playground.address, object_type: "playground"}
  return(dispatch)=> {
    return fetch(`${BASE_URL}/api/v1/edit_bathroom`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bathroom)
    })
    .then(dispatch({type: "EDIT_BATHROOM", payload: bathroom}))
  }
}

export function userEditReview(review) {
  return(dispatch)=> {
    return   fetch(`${BASE_URL}/api/v1/edit_review`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(res=> res.json())
    .then(res => {
      if (res.status === 200) {
        return dispatch({type:"EDIT_REVIEW", payload: review})
      }
    })
  }
}
