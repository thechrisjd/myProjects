import { SET_ALERT, REMOVE_ALERT} from '../actions/types'
const initialState = []

//the begining state is an empty array
// an action has a type and and a payload
export default function (state = initialState, action) {
  //making a switch statement for the different action types
  switch(action.type) {
    case SET_ALERT:
    //state is immutable therefore if there are any alerts already in the array we need to include them by ...state
    //the payload of the action will contian the new alert
      return [...state, action.payload]
    case REMOVE_ALERT:
    //actions have id's, msg, types and payloads
    //this will return the alerts that don't match the id
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state
  }
}
