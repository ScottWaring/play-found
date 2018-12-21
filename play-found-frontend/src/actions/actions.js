export function callBackEndGoogle(body) {
  return (dispatch) => {
  return fetch(`http://localhost:3000/search`,{
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
  return fetch(`http://localhost:3000/search/place`,{
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
  return fetch(`http://localhost:3000/api/v1/profile`,{
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
  return   fetch('http://localhost:3000/api/v1/login', {
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

export function renderPg(pg) {
  console.log(pg)
}
