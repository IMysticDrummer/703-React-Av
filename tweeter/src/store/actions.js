//Ya no hace falta porque lo recibimos a través de thunk
//import { login } from '../components/auth/service';
import { areTweetsLoaded } from './selectors';
import {
  //AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  //  TWEETS_LOADED,
  UI_RESET_ERROR,
  TWEETS_LOADED_REQUEST,
  TWEETS_LOADED_SUCCESS,
  TWEETS_LOADED_FAILURE,
} from './types';

//Creamos los actions creators. Uno por cada acción
//Transformación para convertir esto en un login a través de middleware
export const authLogin = (credentials) => {
  return async function (dispatch, getState, { api }) {
    //Lógica trasladada desde loginPage
    try {
      dispatch(authLoginRequest());
      //Anulamos lo siguiente ya que ahora lo recibimos por extra arguments a través del thunk
      //await login(credentials);
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});
//Se podría crear con una sola función y un solo type, pero es mejor ser descriptivo con las acciones
// const auth = (auth) => ({
//   type: AUTH,
//   payload: auth
// });

export const teewtsLoadedRequest = () => ({
  type: TWEETS_LOADED_REQUEST,
});
export const teewtsLoadedSuccess = (tweets) => ({
  type: TWEETS_LOADED_SUCCESS,
  payload: tweets,
});
export const teewtsLoadedFailure = (error) => ({
  type: TWEETS_LOADED_FAILURE,
  payload: error,
  error: true,
});
export const tweetsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areTweetsLoaded(getState());
    if (areLoaded) {
      return;
    }
    try {
      dispatch(teewtsLoadedRequest());
      const tweets = await api.tweets.getLatestTweets();
      dispatch(teewtsLoadedSuccess(tweets));
    } catch (error) {
      dispatch(teewtsLoadedFailure(error));
      throw error;
    }
  };
};

// export const tweetsLoaded = (tweets) => ({
//   type: TWEETS_LOADED,
//   payload: tweets,
// });

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
