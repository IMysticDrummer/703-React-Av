import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { AuthContextProvider } from './components/auth/context';

import { createStore } from 'redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      //return new state
      return state + 1;
    case DECREMENT:
      //return new state
      return state - 1;
    default:
      //return state
      return state;
  }
};

const store = createStore(reducer);
console.log({ store });

const showState = () => console.log(store.getState());
store.subscribe(showState);
showState();

console.log(store.getState());
store.dispatch({ type: INCREMENT });
console.log(store.getState());
store.dispatch({ type: INCREMENT });
console.log(store.getState());
store.dispatch({ type: DECREMENT });
console.log(store.getState());

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
