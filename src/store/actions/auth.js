import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticateStart = () => {
  return {type: actionTypes.AUTHENTICATE_START};
};

export const authenticate = (email, pass, isSignup) => {
  return async (dispatch) => {
    dispatch(authenticateStart());
    let apiURL = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG6GDviQvElyIHXsUF5yFTO7cvpt2t7Jg' :
                            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG6GDviQvElyIHXsUF5yFTO7cvpt2t7Jg'

    let credentialsRes = await axios.post(apiURL, {email: email, password: pass, returnSecureToken: true})
                                    .catch(e => dispatch(authenticateFail(e)));
    
    if (credentialsRes.data) {
      dispatch(authenticateSuccess(credentialsRes.data))
    }
  };
};

export const authenticateSuccess = (payload) => {
  console.log(payload);
  return {type: actionTypes.AUTHENTICATE_SUCCESS, data: payload};
}

export const authenticateFail = (error) => {
  console.dir(error)
  return {type: actionTypes.AUTHENTICATE_FAIL, error: error}
}