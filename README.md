# REACT AVANZADO

## High order component

### High order function

Son funciones que reciben o retornan otras funcionen.

Por tanto... **HIGH ORDER COMPONENT** es un componente que recibe un componente **y** devuelve un componente.  
Los vamos a utilizar para reutilizar lógica común entre varios componentes.  
Al componente devuelto se le llama **Enhanced Component**.  
(https://reactjs.org/docs/higher-order-components.html)
A los high order components se les suele llamar withXXXX

Se crea un componente que devuelve el renderizado del componente que queremos, pero con más funcionalidades.  
Se debe intentar que los high order components reciban sólamente el compomonente que deben mejorar.

## Utilizar render

(https://reactjs.org/docs/render-props.html)

## Utilizar hooks

# REDUX

Contenedor de estado predecible para aplicaciones Javascript.  
Redux surgió para sacar el estado de los componentes.  
Vamos a tener un contener que contiene el estado, y lo vamos a manejar fuera de los componenetes de React.  
Son estados predecibles. Permite predecir perfectamente cual va a ser el estado resultante cuando voy a realizar un cambio en dicho estado.  
Redux, realmente, no tiene nada que ver con React. Tiene formas de engancharse a React, pero podemos generarlo para aplicaciones no React. Se podría utilizar, incluso en el backend.  
https://redux.js.org

Es una librería javascript:

- Aplicaciones predecibles y testeables
- Estado centralizado: persistencia, undo/redo
- Debuggable: **Redux DevTools**  
  Librería javascript:
- `npm install --save redux`
- Funciona con cualquier librería de vistas (React, Angular, Vue), incluso en el back
- Gran comunidad: addons, librerías, recursos ...

A día de hoy, con el uso de los hooks, hay gente que empieza a renegar de Redux. Todo depende de la aplicación a desarrollar. No es muy útil para aplicaciones pequeñas, pero para aplicaciones medianas - grandes o en entorno empresarial, dónde tenemos que tener controlado el estado de forma organizada y predecible, es mejor Redux.  
Para ejemplo en la práctica, lógicamente, será un uso pequeño, pero nos sirve para entender el uso. En la vida real, no lo utilizaríamos.

El equipo de Redux, generó un tookit (un framwork sobre redux), para cuando conoces bien Redux, que permite realizar muchas acciones de forma más fácil. NO UTILIZAR SIN ENTENDER BIEN REDUX Y CÓMO FUNCIONA.  
https://redux-toolkit.js.org/

Redux se basa en tres principios básicos:

- **Fuente única de verdad**: Los estados están definidos sólo una vez y en un sólo sitio.
- **El estado es de sólo lectura**: El único modo de cambiar el estado es despachar una acción, un objeto que _describe_ el cambio.
  - Lo que hace Redux es crear un nuevo estado partiendo del anterior.
- **Los cambios se realizan con funciones puras**: Los _reducers_ especifican cómo cambia el estado en respuesta a las acciones.
  - Una función pura es aquella que depende de sus parámetros de entrada, que dichos parámetros no pueden ser modificados, y que ante los mismos parámetros de entrada, siempre devuelve el mismo resultado.

## Pasos para crear un store

1. En un archivo indicar los tipos (types.js) de acción a realizar en el store:

- Las acciones se declaran como constantes en mayúsculas, y su valor es la misma acción en texto. Ejemplo:  
  `export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';`

2. En otro archivo se declaran las acciones. Estos son funciones que retornan objetos con type (la acción a realizar según el archivo types) y, si es necesario, payload. El payload es el valor que queremos pasar al estado del store. Ejemplos:

```javascript
export const tweetsLoaded = (tweets) => ({
  type: TWEETS_LOADED,
  payload: tweets,
});
```

- También se pueden pasar acciones que disparen un error, con la siguiente configuración:

```javascript
export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});
```

3. El siguiente paso es declarar los _reducers_, en otro archivo, que son las acciones de cambio del store, según la acción que se haya indicado. En este archivo se declara:

- El estado por defecto, para asegurar un estado mínimo en el store:
  ```javascript
  const defaultState = {
    auth: false,
    tweets: [],
    ui: {
      isLoading: false,
      error: null,
    },
  };
  ```
- Los reducer para cada tipo de elemento del store, que contienen los pasos a realizar según la acción recibida. Por ejemplo:
  ```javascript
  export function auth(state = defaultState.auth, action) {
    switch (action.type) {
      case AUTH_LOGIN_SUCCESS:
        return true;
      case AUTH_LOGOUT:
        return false;
      default:
        return state;
    }
  }
  ```

4. Como **buena práctica** tendremos un archivo _index.js_ que se encargará de:

- Combinar los diferentes reducers, con _`combineReducers`_ de Redux
- Crear el store con _`createStore`_

  - Es este _createStore_ generaremos y devolveremos el store, y combinaremos los reducers para su manejo, el estado predefinido (_preloadedState_), aplicaremos las herramientas para desarrollo redux-devtools, y los middlewares con _`thunk`_

  ```javascript
  import { createStore, combineReducers, applyMiddleware } from 'redux';
  import { composeWithDevTools } from '@redux-devtools/extension';
  // import thunk from 'redux-thunk';

  // import { auth, tweets } from './reducers';
  import * as reducers from './reducers';

  // const reducer = combineReducers({ auth, tweets });
  const reducer = combineReducers(reducers);

  const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    }
    return next(action);
  };

  const middlewares = [thunk];

  export default function configureStore(preloadedState) {
    const store = createStore(
      reducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
  }
  ```

5. Uso del store:

- Utilizaremos `useSelector` para comprobar el estado de un elemento del store de redux. Para ello hay que pasarle una función. Por ejemplo:

```javascript
const isLogged = useSelector((state) => state.auth);
```

    - Es una **buena práctica** cuando tenemos que acceder en varios sitios al mismo elemento del store, generar un archivo aparte (`selectors.js`), donde creemos funciones que nos devuelvan directamente el elemento que queremos, sin tener que escribirlo en todos los lados. De esa manera, cualquier cambio posterior que queramos hacer será mucho más centralizado.

    ```javascript
    export const getIsLogged = (state) => state.auth;
    ```

## ACCIONES

Siempre tienen que ser objetos que representan una intenciòn de cambiar el estado.

- Debe tener una propiedad _type_
- Pueden contener otros datos que describen completamente la acción (**payload**)
- Es **buena práctica** definir los distintos types como constantes, incluso ponerlos en un fichero aparte.  
  Por ejemplo:
  ```javascript
  const ADD_TODO = 'ADD_TODO';
  // o importamos desde otro fichero
  import ADD_TODO from '../actionTypes';
  const action = {
    type: ADD_TODO,
    text: 'Build my first Redux app',
  };
  ```

https://github.com/redux-utilities/flux-standard-action

Para ver las redux devtools en los navegadores, en el sitio donde creamos el store, tenemos que añadir un segundo parámetro. Todo según se indica en:  
https://github.com/reduxjs/redux-devtools

```javascript
export default function configureStore() {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
```

Aunque lo mejor es utilizar el paquete en el proyecto.

## combineReducers

Sirve para partir el reducer principal en trozos más pequeños, para tratarlos y recombinarlos para pasar luego una sola función.
Luego podemos combinarlos con la función combineReducers de Redux, pasando un objeto con las funciones a combinar.

# React-Redux

Es el paquete que une react con redux, de forma sencialla y "ocultando" el store. Además hace las suscripciones y gestiona de forma fácil el renderizado.  
Instalamos react-redux: `npm i --save react-redux`

## Uso

Importamos en el index el `Provider` de react-redux, envolvemos la aplicación y le pasamos el store.

## Conexión de los componentes al almacén

### Con hooks (recomendado)

- **useSelector**:
  - Permite leer datos del store.
  - `const result=useSelector(selection)`
  - A la función le pasamos el store, utilizamos una función para sacar el dato que necesitemos. Por ejemplo:  
    `const isLogged = useSelector(state=>state.auth);`  
    Se puede crear un fichero (selectors.js) y meter esas funciones que devuelven el estado para que lo tengamos todo en el mismo sitio si tenemos que realizar modificaciones más adelante en nuestro modelo o código:  
    `export const getIsLogged = (state) => state.auth;`  
    `const isLogged = useSelector(getIsLogged);`
- **useDispatch**

  - Devuelve la referencia al dispatch del store para disparar acciones.

- **useStore**

### Con connect

Connect es un high order component, que le pasamos un par de parámetros para configurar y ligar el componente a Redux.

Los parámetros son dos funciones:

- La primera trae los datos del estado (mapStateToProps)
- La segunda crea funciones que despachan acciones (mapDispatchToProps)
- Luego aosciamos al compnnente `connect().Component()`

# Middlewares

Vamos a utilizar un middleware que nos va a permitir pasar no solo objetos, sino también funciones a redux.  
Esto tendrá dos utilidades:

1. Podremos pasar toda la lógica asíncrona de obtención de datos, desde los componentes a redux
2. Aumenta la capacidad de redux de recibir, no solo objetos, sino también funciones.

El middleware más utilizado es **thunk**. Thunk va a interceptar todos los _dispatch_. Si el dato introducido es un objeto, lo pasará a redux directamente. Si es una función, la ejecuta el propio thunk.  
Thunk tiene acceso a getState y a dispatch, para poder operar con redux.

Usar redux-thunk: `npm i redux-thunk`
Importar `applyMiddleware` en el store.  
Importamos thunk de redux-thunk: `import thunk from 'redux-thunk'`

Artículo interesante sobe cómo se crean e implementan los middlewares:  
https://redux.js.org/understanding/history-and-design/middleware#understanding-middleware
