//Modelar nuestro estado
//{
//auth: true/false
//tweets: []
//}

import { AUTH_LOGIN, AUTH_LOGOUT, TWEETS_LOADED } from './types';

//ANTES DE combineReducer
//Definimos nuestros reducers
// const defaulState = {
//   auth: false,
//   tweets: [],
// };

// export default function reducer(state = defaulState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       //Siempre generar un nuevo estado
//       return { ...state, auth: true };
//     case AUTH_LOGOUT:
//       //Siempre generar un nuevo estado
//       return { ...state, auth: false };
//     case TWEETS_LOADED:
//       return { ...state, tweets: action.payload };
//     default:
//       return state;
//   }
// }

//combineReducer
//Tendremos unas funciones que tratan cada parte de nuestro store, para luego combinarlo.

//Definimos nuestros reducers
const defaulState = {
  auth: false,
  tweets: [],
};

//Reducer de auth que sólo se encarga del estado de auth
export function auth(state = defaulState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      //Solo devolvemos el dato que necesitamos
      return true;
    case AUTH_LOGOUT:
      //Solo devolvemos el dato que necesitamos
      return false;
    default:
      //Cualquier acción que no sean las anteriores no van a tocar el estado
      return state;
  }
}

//Reducer de auth que sólo se encarga del estado de auth
export function tweets(state = defaulState.tweets, action) {
  switch (action.type) {
    case TWEETS_LOADED:
      //Solo devolvemos el dato que necesitamos
      return action.payload;
    default:
      //Cualquier acción que no sean las anteriores no van a tocar el estado
      return state;
  }
}

export default function reducer(state = defaulState, action) {
  return {
    auth: auth(state.auth, action),
    tweets: tweets(state.tweets, action),
  };
}
