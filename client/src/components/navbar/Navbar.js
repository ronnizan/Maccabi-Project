import React from 'react';
import MaccabiLogo from '../../images/maccabi-logo.png';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <div className='Navbar__Container'>
      <div className='Navbar'>
        <div className='Navbar__linksWrapper'>
          <NavLink
            className={
              location.pathname === '/register-user'
                ? 'Navbar__LinksWrapper__NavLink active'
                : 'Navbar__LinksWrapper__NavLink'
            }
            to={'/register-user'}
          >
            Register New User
          </NavLink>
          <NavLink
            className={
              location.pathname === '/all-users'
                ? 'Navbar__LinksWrapper__NavLink active'
                : 'Navbar__LinksWrapper__NavLink'
            }
            to={'/all-users'}
          >
            All Users
          </NavLink>
        </div>
        <img alt='logo' className='Navbar__Logo' src={MaccabiLogo} />
      </div>
    </div>
  );
};

export default Navbar;
