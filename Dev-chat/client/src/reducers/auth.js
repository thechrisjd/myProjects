import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/types'
//The actions file will send the axios request
// if the request is a success REGISTER_SUCCESS will trigger else REGISTER_FAIL


//the token will be saved in the localStorage if the user has one
//in the begining the user is neither Authenticated or not
// loading is true as we are waiting for server reply which will set it to false
//there is no user data
const initialState = {
  token : localStorage.getItem('Item'),
  isAuthenticated : null,
  loading : true,
  user : null
}

export default function (state = initialState, action) {
  const { type, payload } = action
  //make a switch statement based on the action type
  switch (type) {
    case USER_LOADED:
    return {
      ...state,
      isAuthenticated : true,
      loading : false,
      user : payload
    }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    //we place the token in the local storage
      localStorage.setItem('token', payload.token)
      //we return what ever is in the state and payload
      //the user is now Authenticated
      //we are no longer waiting for the server is loading is false
      return {
        ...state,
        ...payload,
        isAuthenticated : true,
        loading : false
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    //remove token item
      localStorage.removeItem('token')
      //return what ever is in the state
      // token is now null
      // user is not Authenticated
      //we are no longer waiting for the server is loading is false
      return {
        ...state,
        token : null,
        isAuthenticated : false,
        loading : false
      }

    default:
      return state
  }
}
