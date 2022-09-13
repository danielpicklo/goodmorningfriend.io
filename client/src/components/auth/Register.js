import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

const Register = ({setAlert, register}) => {
  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    salutation: ''
  });

  const { name, email, password, confirm_password, salutation } = formData;

  const onChange = e => setFormDate({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if(password !== confirm_password){
      setAlert("Oh no! Passwords do not match!", "danger");
    }else{
      register({ name, email, password, salutation });
      console.log(`Awesome password! Your secret is safe with us, ${salutation}!`);
    }
  }

  return (
    <Fragment>
      <section className='registration'>
        <div className='registration__wrapper'>
          <div className='registration__intro'>
            <h1 className='registration__intro--heading'>Glad to have you aboard, friend!</h1>
            <p className='registration__intro--description'>You're almost there! We just need some more details to set up your account.</p>
          </div>
          <form className='registration__form' onSubmit={e => onSubmit(e)}>
            <div className='grid grid--one-col'>
              <label htmlFor='name'>
                <small>Your name</small>
                <input type='text' placeholder='Your name' name='name' id='name' value={name} onChange={e => onChange(e)} required />
              </label>
            </div>
            <div className='grid grid--two-col'>
              <label htmlFor='email'>
                <small>Your email</small>
                <input type='email' placeholder='Your email' name='email' id='email' value={email} onChange={e => onChange(e)} required />
              </label>
              <label htmlFor='salutation'>
                <small>Preferred salutation</small>
                <input type='text' placeholder='Your salutation' name='salutation' id='salutation' value={salutation} onChange={e => onChange(e)} required />
              </label>
            </div>
            <div className='grid grid--one-col'>
              <label htmlFor='password'>
                <small>Your password</small>
                <input type='password' placeholder='Your password' name='password' id='password' minLength='8' value={password} onChange={e => onChange(e)} required />
                <small><em>Must be at least 8 characters long</em></small>
              </label>
            </div>
            <div className='grid grid--one-col'>
              <label htmlFor='confirm_password'>
                <small>Confirm your password</small>
                <input type='password' placeholder='Confirm password' name='confirm_password' id='confirm_password' minLength='8' value={confirm_password} onChange={e => onChange(e)} required />
              </label>
            </div>
            <div className='grid grid--one-col'>
              <button className='btn btn--primary btn--large'>Create Account</button>
            </div>
          </form>
          <div className='registration__bottom'>
            <p className='registration__bottom--account'>Already have an account? <Link to='/login'>Sign in</Link></p>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register)
