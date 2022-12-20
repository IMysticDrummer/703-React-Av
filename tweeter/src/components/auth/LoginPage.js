import { useMemo, useState } from 'react';
//import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import FormField from '../common/FormField';
//import { useAuth } from './context';
//import { login } from './service';

import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  authLogin,
  //  authLoginFailure,
  //  authLoginRequest,
  //  authLoginSuccess,
  uiResetError,
} from '../../store/actions';
import { getUi } from '../../store/selectors';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState(null);
  //const [isFetching, setIsFetching] = useState(false);

  //Esto ya no es necesario con redirectionamiento por acción
  //const location = useLocation();
  //const navigate = useNavigate();
  //Con Redux, ya no hace falta
  //const { handleLogin } = useAuth();
  const dispatch = useDispatch();
  //Coger el error de redux
  const { isLoading, error } = useSelector(getUi);

  const handleChangeUsername = (event) => setUsername(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  //const resetError = () => setError(null);
  const handleResetError = () => dispatch(uiResetError());

  //No hace falta async con el redirectionamiento por acción, ya que no tiene que esperar a nada.
  //const handleSubmit = async (event) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    //dispatch(authLoginRequest());
    //Esto ya no hace falta si pasamos el redirectionamiento a las acciones
    // dispatch(authLogin({ username, password })).then(() => {
    //   const to = location.state?.from?.pathname || '/';
    //   navigate(to, { replace: true });
    // });
    dispatch(authLogin({ username, password }));

    /*
    try {
      //resetError();
      //setIsFetching(true);
      await login({ username, password });
      //handleLogin();
      //dispatch(authLoginSuccess());

      // const to =
      //   (location.state &&
      //     location.state.from &&
      //     location.state.from.pathname) ||
      //   '/';

    } catch (error) {
      //setError(error);
      //setIsFetching(false);
      dispatch(authLoginFailure(error));
    }
    */
  };
  console.log('render ');
  const isButtonEnabled = useMemo(() => {
    console.log('calculating');
    //return username && password && !isFetching;
    return username && password && !isLoading;
    //}, [username, password, isFetching]);
  }, [username, password, isLoading]);

  return (
    <div className='loginPage'>
      <h1 className='loginPage-title'>Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='username'
          label='phone, email or username'
          className='loginForm-field'
          onChange={handleChangeUsername}
          value={username}
        />
        <FormField
          type='password'
          name='password'
          label='password'
          className='loginForm-field'
          onChange={handleChangePassword}
          value={password}
        />
        <Button
          type='submit'
          variant='primary'
          className='loginForm-submit'
          disabled={!isButtonEnabled}>
          Log in
        </Button>

        {/* <input
          type="checkbox"
          onChange={event => {
            console.log(event.target.checked);
          }}
          // value={remember}
        />
        <input
          type="file"
          onChange={event => console.log(event.target.files)}
        />
        <select
          // value={fruit}
          onChange={event => console.log(event.target.value)}
        >
          <option value="orange">Orange</option>
          <option value="apple">Apple</option>
        </select> */}
      </form>
      {error && (
        <div
          //onClick={resetError}
          onClick={handleResetError}
          className='loginPage-error'>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
