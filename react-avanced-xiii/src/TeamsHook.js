//Este módulo funciona con custom hooks

import useDataReducer from './useDataReducer';

function Teams({ style }) {
  const {
    data: teams,
    isLoading,
    error,
  } = useDataReducer({
    initialState: [],
    url: 'https://www.balldontlie.io/api/v1/teams',
  });

  if (isLoading) {
    return 'loading ....';
  }
  if (error) {
    return `Oooops! ... ${JSON.stringify(error.message)}`;
  }
  return (
    <ul style={style}>
      {teams.map((team) => (
        <li key={team.id}>{team.full_name}</li>
      ))}
    </ul>
  );
}

export default Teams;
