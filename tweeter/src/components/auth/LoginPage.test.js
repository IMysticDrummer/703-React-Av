import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { authLogin } from '../../store/actions';
import { defaultState } from '../../store/reducers';
import LoginPage from './LoginPage';

jest.mock('../../store/actions');

describe('LoginPage', () => {
  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  test('snapshot', () => {
    //Necesitamos el provider para que el componente tenga acceso a las funciones que necesite.
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should dispatch authLogin action', () => {
    const username = 'david';
    const password = '1234';

    renderComponent();

    //Buscar la caja de email, password y el button
    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();

    //Dispara acciones
    fireEvent.change(usernameInput, { target: { value: { username } } });
    fireEvent.change(passwordInput, { target: { value: { password } } });
    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    expect(authLogin).toHaveBeenCalled();
  });
});
