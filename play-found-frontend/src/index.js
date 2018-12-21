import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers/reducers'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from "react-router-dom";
require('dotenv').config()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)))

ReactDOM.render(

    <Provider store={store}>
    <Router>
      <App />
      </Router>
    </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
