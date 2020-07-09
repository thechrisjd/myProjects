import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
//all the different reducers will go into the combineReducers object
export default combineReducers({
  alert,
  auth
 })
