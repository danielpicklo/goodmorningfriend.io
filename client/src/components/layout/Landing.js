import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../files/images/logo.png';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='landing__wrapper'>
          <div className='landing__intro'>
            <img src={logo} alt='logo' className='landing__intro--logo'/>
            <h1 className='landing__intro--heading'>Welcome to goodmorningfriend.io</h1>
            <p className='landing__intro--description'>Get ready to start the day right with those most important to you!</p>
          </div>
          <div className='landing__buttons'>
            <Link to='/register' className='btn btn--primary btn--large'>Sign Up</Link>
            <Link to='/login' className='btn btn--tertiary btn--large'>Login</Link>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Landing
