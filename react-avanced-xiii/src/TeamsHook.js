//Este módulo funciona con custom hooks

import useData from './useData';

function Teams({ style }) {
  const teams = useData({
    initialState: [],
    url: 'https://www.balldontlie.io/api/v1/teams',
  });

  return (
    <ul style={style}>
      {teams.map((team) => (
        <li key={team.id}>{team.full_name}</li>
      ))}
    </ul>
  );
}

export default Teams;
