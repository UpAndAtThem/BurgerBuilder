import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ORDERS_START: return updateObject(state, {loading: true});
    case actionTypes.INIT_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false})
    case actionTypes.INIT_ORDERS_FAIL: return updateObject(state, {orders: [], loading: false});
    case actionTypes.PURCHASE_INIT: return updateObject(state, { purchased: false});
    case actionTypes.PURCHASE_BURGER_START: return updateObject(state, state)
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {orderId: action.orderId});
      return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true})
    case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false});
    default: return {...state};
  }
};

export default orderReducer;