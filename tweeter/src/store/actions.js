//Ya no hace falta porque lo recibimos a través de thunk
//import { login } from '../components/auth/service';
import { areTweetsLoaded, getTweet } from './selectors';
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
  TWEET_LOADED_REQUEST,
  TWEET_LOADED_SUCCESS,
  TWEET_LOADED_FAILURE,
  TWEET_CREATED_REQUEST,
  TWEET_CREATED_SUCCESS,
  TWEET_CREATED_FAILURE,
} from './types';

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
export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT,
});
//Se podría crear con una sola función y un solo type, pero es mejor ser descriptivo con las acciones
// const auth = (auth) => ({
//   type: AUTH,
//   payload: auth
// });

export const authLogout = () => {
  return async function (dispatch, getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutSuccess());
  };
};

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

export const teewtLoadedRequest = () => ({
  type: TWEET_LOADED_REQUEST,
});
export const teewtLoadedSuccess = (tweet) => ({
  type: TWEET_LOADED_SUCCESS,
  payload: tweet,
});
export const teewtLoadedFailure = (error) => ({
  type: TWEET_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tweetLoad = (tweetId) => {
  return async function (dispatch, getState, { api }) {
    const isLoaded = getTweet(tweetId)(getState());
    if (isLoaded) {
      return;
    }
    try {
      dispatch(teewtLoadedRequest());
      const tweet = await api.tweets.getTweetDetail(tweetId);
      dispatch(teewtLoadedSuccess(tweet));
    } catch (error) {
      dispatch(teewtLoadedFailure(error));
      throw error;
    }
  };
};

// export const tweetsLoaded = (tweets) => ({
//   type: TWEETS_LOADED,
//   payload: tweets,
// });

export const tweetCreatedRequest = () => ({
  type: TWEET_CREATED_REQUEST,
});
export const tweetCreatedSuccess = (tweet) => ({
  type: TWEET_CREATED_SUCCESS,
  payload: tweet,
});
export const tweetCreatedFailure = (error) => ({
  type: TWEET_CREATED_FAILURE,
  payload: error,
  error: true,
});

export const tweetCreate = (tweet) => {
  return async function (dispatch, getState, { api }) {
    try {
      dispatch(tweetCreatedRequest());
      const createdTweet = await api.tweets.createTweet(tweet);
      dispatch(tweetCreatedSuccess(createdTweet));
      //devolvemos el tweet para poder utilizarlo fuera
      return createdTweet;
    } catch (error) {
      dispatch(tweetCreatedFailure(error));
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
