import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Root from './Root';

import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

//import './store-poc';
import configureStore from './store';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

//Pasamos un preloadedState. En este caso el estado de autentificación
const store = configureStore({ auth: !!accessToken });
//Con las devtools no hace falta tener esto para hacer dispatch manuales
//window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
//Redux... eliminamos todo lo relacionado al AuthContextProvider
//import { AuthContextProvider } from './components/auth/context';
//<AuthContextProvider isInitiallyLogged={!!accessToken}></AuthContextProvider>
root.render(
  <React.StrictMode>
    <Root store={store}>
      <App />
    </Root>
  </React.StrictMode>
);
