import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  loading: false
};

const authenticateStart = (state, action) => {
  return updateObject(state, {loading: true});
}

const authenticateSuccess = (state, action) => {
  return updateObject(state, {loading: false});
}

const authenticateFail = (state, action) => {
  return updateObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE_START: return authenticateStart(state, action);
    case actionTypes.AUTHENTICATE_SUCCESS: return authenticateSuccess(state, action);
    case actionTypes.AUTHENTICATE_FAIL: return authenticateFail(state, action);
    default: return state;
  }
};

export default reducer;
