//Este módulo funciona como hiah order con  doble llamada

import withData from './withData';

//export defatult function Players() {
function Players({ data: players }) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>{`${player.first_name} ${player.last_name}`}</li>
      ))}
    </ul>
  );
}

//Primero envolvemos el componente, en el que será el high order component
export default withData({
  url: 'https://www.balldontlie.io/api/v1/players',
  initialState: [],
})(Players);
