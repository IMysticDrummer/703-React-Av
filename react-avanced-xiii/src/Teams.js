//Este módulo funciona con un render llamado data loader

import DataLoader from './DataLoader';
import useData from './useData';
//import withData from './withData';

//export default function Teams() {
//La cabecera comentada sería por high order
//function Teams({ data: teams, style }) {
function Teams({ style }) {
  const {
    data: teams,
    isLoading,
    error,
  } = useData({
    initialState: [],
    url: 'https://www.balldontlie.io/api/v1/teams',
  });

  if (isLoading) {
    return '...loading';
  }

  if (error) {
    return `ooops...${error.message}`;
  }

  //con render
  return (
    <DataLoader>
      <ul style={style}>
        {teams.map((team) => (
          <li key={team.id}>{team.full_name}</li>
        ))}
      </ul>
    </DataLoader>
  );
}

export default Teams;

//BLOQUE PARA HIGH ORDER
//Destructuramos la prop data y la llamamos teams para usarla aquí.
//La lógica del useEffect lo hemos trasladado a withData

// return (
//   <ul style={style}>
//     {teams.map((team) => (
//       <li key={team.id}>{team.full_name}</li>
//     ))}
//   </ul>
// );

//Primero envolvemos el componente, en el que será el high order component
// const enhancedComponent = withData({
//   url: 'https://www.balldontlie.io/api/v1/teams',
//   initialState: [],
// })(Teams);

// export default enhancedComponent;
