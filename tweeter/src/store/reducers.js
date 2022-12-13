//Modelar nuestro estado
//{
//auth: true/false
//tweets: []
//}

import { AUTH_LOGIN, AUTH_LOGOUT, TWEETS_LOADED } from './types';

//Definimos nuestros reducers
const defaulState = {
  auth: false,
  tweets: [],
};

export default function reducer(state = defaulState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      //Siempre generar un nuevo estado
      return { ...state, auth: true };
    case AUTH_LOGOUT:
      //Siempre generar un nuevo estado
      return { ...state, auth: false };
    case TWEETS_LOADED:
      return { ...state, tweets: action.payload };
    default:
      return state;
  }
  return state;
}
