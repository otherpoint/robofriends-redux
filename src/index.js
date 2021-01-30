import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import App from './containers/App';
//import redux and the middleware function which allows us to include middleware in the store
import {createStore, applyMiddleware, combineReducers} from 'redux';
//import the Provider components from react-redux. The provider component handles passing down the store to all of it's children.
import {Provider} from 'react-redux';
//import the search robots and requestRobots reducers to produce the root reducer for the redux store
import {searchRobots,requestRobots} from './reducers';
//import redux-logger middleware. in the video 'createLogger' is imported but the middleware does it this way now, no need to initialize it in the app using createLogger anymore as andrei did
import {logger} from 'redux-logger';
//import think middleware
import thunkMiddleware from 'redux-thunk';


//combine all reducers into a single root reducer with the combineReduvers() method. it takes an object of all reducers as an argument.
const rootReducer = combineReducers({searchRobots,requestRobots});

//create the redux store as a constant using 'createStore' provided by the redux import and using the root reducer as the basis for the state store.
const store =  createStore(rootReducer,applyMiddleware(logger,thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


