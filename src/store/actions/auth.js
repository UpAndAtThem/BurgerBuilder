import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticateStart = () => {
  return { type: actionTypes.AUTHENTICATE_START };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATE_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime, refreshToken) => {
  return (dispatch) => {
    setTimeout(() => {
      axios
        .post(
          `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
          { grant_type: 'refresh_token', refresh_token: refreshToken }
        )
        .then((res) => {
          dispatch(logout(res.data));
        })
        .catch((err) => {
          dispatch(logout());
        });
    }, expirationTime * 1000);
  };
};

export const authenticate = (email, pass, isSignup) => {
  return async (dispatch) => {
    dispatch(authenticateStart());
    let apiURL = isSignup
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    let credentialsRes = await axios
      .post(apiURL, { email: email, password: pass, returnSecureToken: true })
      .catch((e) => {
        return dispatch(authenticateFail(e.response.data.error));
      });

    if (credentialsRes.data) {
      dispatch(authenticateSuccess(credentialsRes.data));
      dispatch(
        checkAuthTimeout(
          credentialsRes.data.expiresIn,
          credentialsRes.data.refreshToken
        )
      );
    }
  };
};

export const authenticateSuccess = (payload) => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    token: payload.idToken,
    userId: payload.localId,
  };
};

export const authenticateFail = (error) => {
  return { type: actionTypes.AUTHENTICATE_FAIL, error: error };
};

export const authenticateRefresh = (payload) => {
  console.log(payload);
  return {
    type: actionTypes.AUTHENTICATE_REFRESH,
    token: payload.idToken,
    userId: payload.localId,
  };
};
