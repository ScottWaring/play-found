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
