import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
//import reducer from './reducers'; //comentado para utilizar combineReducers

//Llamada para utilizar devtools desde el navegador
// export default function configureStore() {
//   const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

//   return store;
// }

//Llamada para utilizar las devtools con el paquete npm instalado
//Paso 2 importando y combinando reducers con Redux

import * as reducers from './reducers'; //Esta importación devuelve un objeto con todas las funciones importadas
//Las siguientes importaciones nos sirven para inyectar lo que necesiten nuestras acciones sin tener que importarlo directamente en el archivo de acciones
import * as auth from '../components/auth/service';
import * as tweets from '../components/tweets/service';

const reducer = combineReducers(reducers);

//Ejemplo implementación de un middelware.
//En este caso un middleware de información que nos enseña el estado de cada estado
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action, store.getState());
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

//Ejemplo de construcción nuestro propio thunk
// const thunk2 = (store) => (next) => (action) => {
//   if (typeof action === 'function') {
//     return action(store.dispatach, store.getState);
//   }
//   return next(action);
// };

//HighOrderFunction para el manejo de histórico de acciones de nuestro reducer
const historyHighOrderReducer = (reducer) => {
  return (state, action) => {
    //Esto lo que hace es que del estado que reciba:
    //  1- desestructura history. Si no existe, lo crea como array vacío
    //  2- el resto del estado lo guarda en el objeto rootState
    const { history = [], ...rootState } = state;

    if (action.type === 'HISTORY_BACK') {
      const newHistory = history.slice(0, history.length - 1);
      return {
        ...newHistory[newHistory.length - 1].state,
        history: newHistory,
      };
    }

    const newState = reducer(rootState, action);
    return {
      ...newState,
      history: [...history, { action, state: newState }],
    };
  };
};

//Nuevo middelware que va gestionar las redirecciones.
const failureRedirections =
  (router, redirections) => (store) => (next) => (action) => {
    const result = next(action);

    if (action.error) {
      const redirection = redirections[action.payload.status];
      if (redirection) {
        router.navigate(redirection);
      }
    }

    return result;
  };

//Siempre hay que tener cuidado del orden en el que ponemos los middlewares.
//Para nuestro logger, nos interesa que esté lo más cerca del dispatch. Por eso lo pondremos detrás del thunk
//Ahora movemos el array de middleware dentro del configureStore para añadir el router
// const middlewares = [
//   thunk.withExtraArgument({ api: { auth, tweets } }),
//   logger,
// ];
// Añadimos un estado de precarga que inicialice es store. Esto es diferente de tener un estado por defecto, en el caso que no enviemos nada
//La asignación la hace internamente.
// export default function configureStore(preloadedState, { router }) {
//   const middlewares = [
//     thunk.withExtraArgument({ api: { auth, tweets }, router }),
//     logger,
//   ];
//   const store = createStore(
//     reducer,
//     preloadedState,
//     composeWithDevTools(applyMiddleware(...middlewares))
//     // other store enhancers if any
//   );

//   return store;
// }

//Nueva configuración del store, que gestiona las redirecciones no adecuadas
export default function configureStore(preloadedState, { router }) {
  const middlewares = [
    thunk.withExtraArgument({ api: { auth, tweets }, router }),
    failureRedirections(router, {
      401: '/login',
      404: '/404',
    }),
    logger,
  ];
  const store = createStore(
    //reducer, //cambiado para el histórico
    historyHighOrderReducer(reducer),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}
