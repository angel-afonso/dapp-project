import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./reducers";
import * as serviceWorker from './serviceWorker';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
    thunk,
    createPromise({
        promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
];

const store = createStore(
    rootReducer, {},
    (composeEnhancers && composeEnhancers(applyMiddleware(...middlewares))) ||
    applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
