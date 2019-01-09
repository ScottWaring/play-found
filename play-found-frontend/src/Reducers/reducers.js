
let initalState = {
  user: {},
  loggedIn: false,
  playgrounds: [],
  selectedPlayground: {},
  selectedPlaygroundReviews: [],
  userHasContent: false,
  userReviews: [],
  viewReview: {},
  userPlaygrounds: [],
  userBathrooms: [],
  coords: {},
  localBathrooms: [],
  viewBathroom: {},
  renderPlaygroundResults: false,
  reviewAdded: false,
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
    console.log("coords", action.payload)
    console.trace()
      return {...state, coords: action.payload, renderPlaygroundResults: true }
    case "VIEW_PLAYGROUND":
      return {...state, selectedPlayground: action.payload.playground, selectedPlaygroundReviews: action.payload.reviews}
    case "ADD_LOCAL_BATHROOMS":
      return {...state, localBathrooms: action.payload.bathrooms}
    case "SHOW_BATHROOM":
      let br = state.localBathrooms.find(b => b.id === action.payload)
      return {...state, viewBathroom: br}
    case "SHOW_USER_BATHROOM":
      let br_body = {}
      br_body.lat = parseFloat(action.payload.coordinates[0].lat)
      br_body.lng  = parseFloat(action.payload.coordinates[0].lng)
      console.log("show user bathrom", br_body)
      return {...state, viewBathroom: action.payload, coords: br_body}
    case "CLOSE_BATHROOM":
      return {...state, viewBathroom: action.payload}
    case "SHOW_USER_REVIEW":
      return {...state, viewReview: action.payload}
    case "CLOSE_REVIEW":
      return {...state, viewReview: {}}
    case "REVIEW_GOOD":
      return {...state, reviewAdded: true, userReviews: [...state.userReviews, action.payload.review], selectedPlaygroundReviews: [...state.selectedPlaygroundReviews, action.payload] }
    case "BATHROOM_GOOD":
      return {...state, reviewAdded: true, userBathrooms: [...state.userBathrooms, action.payload] }
    case "PLAYGROUND_GOOD":
      return {...state, reviewAdded: true, userPlaygrounds: [...state.userPlaygrounds, action.payload] }
    case "ADD_REVIEWS":
      return {...state, selectedPlaygroundReviews: action.payload}
    case "CLEAR_OLD_REVIEWS":
      return {...state, selectedPlaygroundReviews: []}
    case "REMOVE_REVIEW":
      let newReviewArr = state.userReviews.filter(r => r.id !== action.payload)
      return {...state, userReviews: newReviewArr}
    case "REMOVE_BATHROOM":
      let newBathroomArr = state.userBathrooms.filter(b => b.id !== action.payload)
      return {...state, userBathrooms: newBathroomArr}
    case "REMOVE_PLAYGROUND":
      let newPlaygroundArr = state.userPlaygrounds.filter(p => p.id !== action.payload)
      return {...state, userPlaygrounds: newPlaygroundArr}
    case "EDIT_PLAYGROUND":
      let editPlaygroundArr = state.userPlaygrounds.filter(p => p.id !== action.payload.id)
      return {...state, userPlaygrounds: [...editPlaygroundArr, action.payload]}
    case "EDIT_BATHROOM":
      let e_br = action.payload
      e_br.coordinates = [action.payload.coordinates]
      let editBathroomArr = state.userBathrooms.filter(b => b.id !== action.payload.id)
      return {...state, userBathrooms: [...editBathroomArr, e_br]}
    case "EDIT_REVIEW":
    let editReviewArr = state.userReviews.filter(r => r.id !== action.payload.id)
    return {...state, userReviews: [...editReviewArr, action.payload]}
    case "CLEAR_OLD_STATE":
      return {...state, coords: {}, localBathrooms: [], renderPlaygroundResults: false, reviewAdded: false}
    default:
      return state
  }

}
