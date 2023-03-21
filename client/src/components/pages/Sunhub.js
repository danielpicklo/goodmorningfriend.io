import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import logo from '../../files/images/logo.png';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';

const SunHub = ({getCurrentProfile, auth, profile}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

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

SunHub.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(SunHub)
