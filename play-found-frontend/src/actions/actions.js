// const BASE_URL = "http://localhost:3000"
const BASE_URL = `http://192.168.1.226:3000`


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
    .then(console.log)
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
    .then(console.log)
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
    .then(console.log)
  }
}

export function getUserContent(body) {
  console.log(body)
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
  console.log(id)
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
        return dispatch({type: "VIEW_PLAYGROUND", payload: res})
      }
    })
  }
}
