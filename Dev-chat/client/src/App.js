import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

//Redux
// provider liknks react and redux together
//wrape the app in the provider
import {Provider} from 'react-redux'
import store from './store.js'

import {loadUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken' 

if (localStorage.token) {
  setAuthToken(localStorage.token )
}

const App = () => {
  //useEffect is a react hook
  //this is the class equal to componentDidMount
  //useEffect has a down side. It will keep running in a continues loop unless you add an empty array
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path = '/' component={Landing}/>
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
