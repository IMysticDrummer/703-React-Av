import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { defaultState } from '../../store/reducers';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('snapshot', () => {
    const store = {
      getState: () => defaultState,
      dispatch: () => {},
      subscribe: () => {},
    };
    //Necesitamos el provider para que el componente tenga acceso a las funciones que necesite.
    const { container } = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
