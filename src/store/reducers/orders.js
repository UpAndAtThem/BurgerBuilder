import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      console.log('STATE: ', state);
      console.log('ACTION: ', action);
      return {};
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        orderId: action.orderId
      }

      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default orderReducer;