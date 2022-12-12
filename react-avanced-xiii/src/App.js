import Players from './Players';
import TeamsHook from './TeamsHook';
import Teams from './Teams';

function App() {
  return (
    <div className='App'>
      <Teams style={{ color: 'red' }} />
      <Players />
      <TeamsHook />
    </div>
  );
}

export default App;
