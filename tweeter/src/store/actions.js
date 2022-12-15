import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  TWEETS_CREATED,
  TWEETS_LOADED,
  UI_RESET_ERROR,
} from './types';

//Creamos los actions creators. Uno por cada acción
export const authLogin = () => ({
  type: AUTH_LOGIN,
});
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});
//Se podría crear con una sola función y un solo type, pero es mejor ser descriptivo con las acciones
// const auth = (auth) => ({
//   type: AUTH,
//   payload: auth
// });

export const tweetsLoaded = (tweets) => ({
  type: TWEETS_LOADED,
  payload: tweets,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});
export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});
export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
