import Players from './Players';
import TeamsHook from './TeamsHook';
import Teams from './Teams';
import ErrorBoundary from './ErrorBoundary';
import Portal from './Portal';

function App() {
  return (
    <ErrorBoundary>
      <div
        className='App'
        onClick={(event) => {
          console.log(event);
        }}>
        <Portal>
          <Teams style={{ color: 'red' }} />
        </Portal>
        <Players />
        EQUIPOS HOOKEADOS
        <TeamsHook />
      </div>
    </ErrorBoundary>
  );
}

export default App;
