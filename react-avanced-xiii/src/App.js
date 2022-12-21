import Players from './Players';
import TeamsHook from './TeamsHook';
import Teams from './Teams';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className='App'>
        <Teams style={{ color: 'red' }} />
        <Players />
        EQUIPOS HOOKEADOS
        <TeamsHook />
      </div>
    </ErrorBoundary>
  );
}

export default App;
