import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  TWEETS_CREATED,
  TWEETS_LOADED,
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
