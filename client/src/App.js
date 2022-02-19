import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Login from './components/Login/login';
import Home from './components/dashboard/home';
import Register from './components/Register/register';
import { loadUser } from "./actions/auth";
// Redux import
import { Provider } from "react-redux";
import store from "./store";
import Alerts from './components/layouts/Alert';
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>{

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
        <Alerts />
          <Switch>
            <Redirect exact from="/login" to="/" />
            <Route exact path="/"component={Login} />
            <Route exact path="/register"component={Register} />
            <PrivateRoute exact path='/home' component={Home} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
