import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../common/Button';

import logo, { ReactComponent as Icon } from '../../assets/twitter.svg';

import './Header.css';
import { logout } from '../auth/service';

//Con redux ya no hace falta
//import { useAuth } from '../auth/context';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions';

const Header = ({ className }) => {
  const isLogged = useSelector(getIsLogged);
  //Esta asignación, con Redux cambia
  //const { isLogged, handleLogout } = useAuth();
  //const { handleLogout } = useAuth();
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    //await logout();
    //handleLogout();
    dispatch(authLogout());
  };

  return (
    <header className={classNames('header', className)}>
      <Link to='/'>
        <div className='header-logo'>
          {/* <img src={logo} alt="Twitter-React" /> */}
          <Icon
            width='32'
            height='32'
          />
        </div>
      </Link>
      <nav className='header-nav'>
        <NavLink
          to='/tweets/new'
          // className={({ isActive }) => (isActive ? 'selected' : '')}
          // style={({ isActive }) => (isActive ? { color: 'green' } : null)}
        >
          New tweet
        </NavLink>
        |
        <NavLink
          to='/tweets'
          // className={({ isActive }) => (isActive ? 'selected' : '')}
          // style={({ isActive }) => (isActive ? { color: 'green' } : null)}
          end>
          See all tweets
        </NavLink>
        {isLogged ? (
          <Button
            className='header-button'
            onClick={handleLogoutClick}>
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            to='/login'
            variant='primary'
            className='header-button'>
            Login
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
