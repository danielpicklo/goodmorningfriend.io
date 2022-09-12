import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    salutation: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
  }

  return (
    <Fragment>
      <section className='registration'>
        <div className='registration__wrapper'>
          <div className='registration__intro'>
            <h1 className='registration__intro--heading'>Welcome back, friend!</h1>
            <p className='registration__intro--description'>Get excited for a good morning! Please sign in. </p>
          </div>
          <form className='registration__form' onSubmit={e => onSubmit(e)}>
            <div className='grid grid--one-col'>
              <label htmlFor='email'>
                <small>Email</small>
                <input type='email' placeholder='Email' name='email' id='email' value={email} onChange={e => onChange(e)} required />
              </label>
            </div>
            <div className='grid grid--one-col'>
              <label htmlFor='password'>
                <small>Password</small>
                <input type='password' placeholder='Your password' name='password' id='password' minLength='8' value={password} onChange={e => onChange(e)} required />
              </label>
            </div>
            <div className='grid grid--one-col'>
              <button className='btn btn--primary btn--large'>Log In</button>
            </div>
          </form>
          <div className='registration__bottom'>
            <p className='registration__bottom--account'>Don't have an account yet? <Link to='/register'>Register</Link></p>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Login