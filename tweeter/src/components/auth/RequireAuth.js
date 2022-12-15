import { Navigate, useLocation } from 'react-router-dom';

//Para redux importamos
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

//Con Redux, isLogged ya viene por el store
//export const RequireAuth = ({ isLogged, children }) => {
export const RequireAuth = ({ children }) => {
  //la función recibe todo el estado, y cogemos sólo lo que necesitamos
  const isLogged = useSelector(getIsLogged);

  const location = useLocation();
  if (!isLogged) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
      />
    );
  }
  return children;
};

//Con Redux esto no nos hace falta
//import { AuthContextConsumer } from './context';
// const ConnectedRequireAuth = props => {
//   return (
//     <AuthContextConsumer>
//       {value => <RequireAuth {...props} isLogged={value.isLogged} />}
//     </AuthContextConsumer>
//   );
// };

//export default ConnectedRequireAuth;

export default RequireAuth;
