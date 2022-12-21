//Modelar nuestro estado
//{
//auth: true/false
//tweets: []
//}

import {
  //AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  //AUTH_LOGIN_REQUEST,
  //AUTH_LOGIN_FAILURE,
  //TWEETS_LOADED,
  TWEETS_LOADED_SUCCESS,
  TWEET_LOADED_SUCCESS,
  UI_RESET_ERROR,
  TWEET_CREATED_SUCCESS,
} from './types';

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
export const defaultState = {
  auth: false,
  //tweets: [],
  tweets: {
    data: [],
    areLoaded: false,
  },
  ui: {
    error: null,
    isLoading: false,
  },
};

//Reducer de auth que sólo se encarga del estado de auth
export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    //case AUTH_LOGIN:
    case AUTH_LOGIN_SUCCESS:
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
export function tweets(state = defaultState.tweets, action) {
  /*if (action.type)
    switch (action.type) {
      // case TWEETS_LOADED:
      //   //Solo devolvemos el dato que necesitamos
      //   return action.payload;
      case TWEETS_LOADED_SUCCESS:
        return action.payload;
      default:
        //Cualquier acción que no sean las anteriores no van a tocar el estado
        return state;
    }
    */
  if (action.type === TWEETS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  if (action.type === TWEET_LOADED_SUCCESS) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === TWEET_CREATED_SUCCESS) {
    return { ...state, data: [action.payload, ...state.data] };
  }
  return state;
}

//Comentamos porque no lo necesitaríamos si utilizamos combineReducers
// export default function reducer(state = defaulState, action) {
//   return {
//     auth: auth(state.auth, action),
//     tweets: tweets(state.tweets, action),
//   };
// }

export function ui(state = defaultState.ui, action) {
  // switch (action.type) {
  //   case AUTH_LOGIN_REQUEST:
  //     return {
  //       error: null,
  //       isLoading: true,
  //     };
  //   case AUTH_LOGIN_SUCCESS:
  //     return {
  //       error: null,
  //       isLoading: false,
  //     };
  //   case AUTH_LOGIN_FAILURE:
  //     return {
  //       isLoading: false,
  //       error: action.payload,
  //     };
  //   case UI_RESET_ERROR:
  //     return {
  //       ...state,
  //       error: null,
  //     };
  //      default:
  //        return state;

  //Tratamiento con agrupaciones de tipos de acción, y usando expresiones regulares
  //Siempre que haya un error (en las acciones declaramos un campo error al estado)
  if (action.error) {
    return {
      isLoading: false,
      error: action.payload,
    };
  }

  //Toda acción que acabe en REQUEST con expresiones regulares
  if (/_REQUEST$/.test(action.type)) {
    return {
      error: null,
      isLoading: true,
    };
  }
  //Toda acción que acabe en SUCCESS con expresiones regulares
  if (/_SUCCESS$/.test(action.type)) {
    return {
      error: null,
      isLoading: false,
    };
  }
  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }

  return state;
}
