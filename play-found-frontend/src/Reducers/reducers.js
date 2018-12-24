
let initalState = {
  user: {},
  loggedIn: false,
  playgrounds: [],
  selectedPlayground: {},
  userHasContent: false,
  userReviews: [],
  userPlaygrounds: [],
  userBathrooms: [],
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
    case "LOG_USER_OUT":
      localStorage.clear()
      return {...state, user: action.payload, loggedIn: false}
    case "ADD_USER_CONTENT":
      return {...state,
        userReviews: action.payload.user_content.reviews,
        userPlaygrounds: action.payload.user_content.playgrounds,
        userBathrooms: action.payload.user_content.bathrooms,
        userHasContent: true
      }
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
