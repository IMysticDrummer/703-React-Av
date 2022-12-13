import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducers';

//Llamada para utilizar devtools desde el navegador
// export default function configureStore() {
//   const store = createStore(
//     reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

//   return store;
// }

//Llamada para utilizar las devtools con el paquete npm instalado
export default function configureStore() {
  const store = createStore(
    reducer,
    composeWithDevTools()
    //applyMiddleware(...middleware)
    // other store enhancers if any
  );

  return store;
}
