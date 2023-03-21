import {setAlert} from './alert'
import api from '../utils/api';

import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types'

//Get current user's profile and details
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {message: error.response.statusText, status: error.response.status}
    })
  }
}