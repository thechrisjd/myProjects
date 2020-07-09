//This file will manage the app level state. Boiler plate code
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
//Reducers specify how the application's state changes
import rootReducer from './reducers'


const initialStore = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
