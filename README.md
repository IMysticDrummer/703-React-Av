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
