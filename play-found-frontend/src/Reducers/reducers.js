
let initalState = {
  user: {},
  loggedIn: false,
  playgrounds: [],
  selectedPlayground: {},
  bathrooms: [],
  reviews: []
}



export default function reducers(state = initalState, action) {
  switch(action.type) {
    case "UPDATE_LOGGED_IN":
      return {loggedIn: !action.payload}
    default:
      return state
  }

}
