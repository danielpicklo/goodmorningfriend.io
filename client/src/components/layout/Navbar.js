import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='navbar__navigation flex flex-row flex--jst-spc-btwn flex--aln-center'>
      <li className='navbar__navigation--menu-item'><Link to='/sunhub' className='btn btn--link btn--nav'>SunHub</Link></li>
      <li className='navbar__navigation--menu-item'><Link to='/settings' className='btn btn--link btn--nav'>Settings</Link></li>
      <li className='navbar__navigation--menu-item'><Link to='/friends' className='btn btn--link btn--nav'>Friends</Link></li>
      <li className='navbar__navigation--menu-item'><Link to='/about' className='btn btn--link btn--nav'>About</Link></li>
      <li className='navbar__navigation--menu-item'><a onClick={logout} href='/' className='btn btn--secondary btn--small'>Logout <i class="fa-solid fa-hand-spock"></i></a></li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar__navigation flex flex-row flex--jst-spc-btwn flex--aln-center'>
      <li className='navbar__navigation--menu-item'><Link to='/about' className='btn btn--link btn--nav'>About</Link></li>
      <li className='navbar__navigation--menu-item'><Link to='/login' className='btn btn--secondary btn--small'>Login</Link></li>
      <li className='navbar__navigation--menu-item'><Link to='/register' className='btn btn--tertiary btn--small'>Sign Up</Link></li>
    </ul>
  );

  return (
    <div className='content--wrapper'>
      <nav className='navbar'>
        { !loading && <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
      </nav>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
