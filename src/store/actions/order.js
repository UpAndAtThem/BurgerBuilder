import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const initOrders = () => {
  return (dispatch) => {
    axios
      .get('https://burgerbuilder-c8226.firebaseio.com/orders.json')
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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());

    axios
      .post('/orders.json', orderData)
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
