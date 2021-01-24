import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Test from './components/pages/Test'
// import TestTS from './components/pages/TestTS'

import './sass/index.scss'

import { Provider } from "react-redux"; //reduxを接続
import store from "./store"; //storeとreduxを結びつける



const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Test} />
        {/* <Route path="/ts" component={TestTS} /> */}
      </Switch>
    </Router>
  )
}


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
