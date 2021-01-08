import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authenticateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    userId: null,
    token: null,
  });
};

const authenticateSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authenticateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    token: null,
    userId: null,
  });
};

const authenticateLogout = (state, action) => {
  return updateObject(state, {
    userId: null,
    token: null,
    error: null,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_START:
      return authenticateStart(state, action);
    case actionTypes.AUTHENTICATE_SUCCESS:
      return authenticateSuccess(state, action);
    case actionTypes.AUTHENTICATE_FAIL:
      return authenticateFail(state, action);
    case actionTypes.AUTHENTICATE_LOGOUT:
      return authenticateLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
