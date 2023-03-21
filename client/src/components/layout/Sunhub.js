import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../files/images/logo.png';

const SunHub = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='landing__wrapper'>
          <div className='landing__intro'>
            <img src={logo} alt='logo' className='landing__intro--logo'/>
            <h1 className='landing__intro--heading'>SunHub</h1>
            <p className='landing__intro--description'>You finally made it!</p>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default SunHub
