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
