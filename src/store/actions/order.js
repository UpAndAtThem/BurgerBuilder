import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const initOrdersStart = (token) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.INIT_ORDERS_START });
    dispatch(initOrders(token));
  };
};

export const initOrders = (token) => {
  return (dispatch) => {
    axios
      .get('/orders.json?auth=' + token)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key], 
            id: key,
          });
        }
        dispatch(initOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(initOrdersFail());
      });
  };
};

export const initOrdersSuccess = (orders) => {
  return {
    type: actionTypes.INIT_ORDERS_SUCCESS,
    orders: orders
  }
};

export const initOrdersFail = () => {
  return { 
    type: actionTypes.INIT_ORDERS_FAIL,
    orders: [] 
  }
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());

    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        console.log('ERROR: ', error);
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
