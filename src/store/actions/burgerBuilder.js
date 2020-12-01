import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: name
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: name
  }
}; 

const setIngredients = (ingredients) => {
  return {type: actionTypes.INIT_INGREDIENTS, ingredients: { ...ingredients }}
};

export const initIngredients = () => {
    return (dispatch) => {
      axios
      .get('https://burgerbuilder-c8226.firebaseio.com/ingredients.json')
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    };
};