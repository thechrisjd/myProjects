import uuid from 'uuid'
//universal user id. This creates a random id string
import {SET_ALERT, REMOVE_ALERT} from './types'

//this action will be called by components
//dispatch is a thunk middleware
//actions alone return objects if I need them to do anything else thunk needs to be called
//dispatch. Dispatches new actions
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload : { msg, alertType, id}
  })

  setTimeout(() => dispatch({type : REMOVE_ALERT, payload : id}), timeout)
}
