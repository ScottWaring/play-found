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
    .then(res => dispatch({type: "ADD_PLAYGROUNDS", payload: res}))
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

export function addCoordinates(body) {
  return(dispatch)=> {
    return dispatch({type: "ADD_COORDS", payload: body})
  }
}

export function renderPg(pg) {
  console.log(pg)
}
