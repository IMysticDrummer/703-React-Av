import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
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

const reducer = combineReducers(reducers);
// Añadimos un estado de precarga que inicialice es store. Esto es diferente de tener un estado por defecto, en el caso que no enviemos nada
//La asignación la hace internamente.
export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools()
    //applyMiddleware(...middleware)
    // other store enhancers if any
  );

  return store;
}
