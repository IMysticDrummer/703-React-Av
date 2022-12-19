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

const reducer = combineReducers(reducers);

//Ejemplo de construcción nuestro propio thunk
const thunk2 = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatach, store.getState);
  }
  return next(action);
};

//Siempre hay que tener cuidado del orden en el que ponemos los middlewares.
//Para nuestro logger, nos interesa que esté lo más cerca del dispatch. Por eso lo pondremos detrás del thunk
const middlewares = [
  thunk.withExtraArgument({ api: { auth, tweets } }),
  logger,
];
// Añadimos un estado de precarga que inicialice es store. Esto es diferente de tener un estado por defecto, en el caso que no enviemos nada
//La asignación la hace internamente.
export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
    // other store enhancers if any
  );

  return store;
}
