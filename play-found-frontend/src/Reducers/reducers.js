
let initalState = {
  user: {},
  loggedIn: false,
  playgrounds: [],
  selectedPlayground: {},
  bathrooms: [],
  reviews: [],
  coords: {}
}



export default function reducers(state = initalState, action) {
  switch(action.type) {
    case "LOG_IN_USER":
      localStorage.clear()
      localStorage.setItem("token", action.payload.jwt)
      return {...state, user: action.payload.user, loggedIn: true}
    case "GET_USER":
      return {...state, user: action.payload.user, loggedIn: true}
    case "ADD_PLAYGROUNDS":
      return {...state, playgrounds: action.payload.results}
    case "ADD_COORDS":
      return {...state, coords: action.payload }
    case "VIEW_PLAYGROUND":
      return {...state, selectedPlayground: action.payload}
    default:
      return state
  }

}
