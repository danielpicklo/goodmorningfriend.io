import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='content--wrapper'>
      <nav className='navbar'>
        <ul className='navbar__navigation flex flex-row flex--jst-spc-btwn flex--aln-center'>
          <li className='navbar__navigation--menu-item'><Link to='/sunhub' className='btn btn--link btn--nav'>SunHub</Link></li>
          <li className='navbar__navigation--menu-item'><Link to='/settings' className='btn btn--link btn--nav'>Settings</Link></li>
          <li className='navbar__navigation--menu-item'><Link to='/about' className='btn btn--link btn--nav'>About</Link></li>
          <li className='navbar__navigation--menu-item'><Link to='/login' className='btn btn--secondary btn--small'>Login</Link></li>
          <li className='navbar__navigation--menu-item'><Link to='/register' className='btn btn--tertiary btn--small'>Sign Up</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
