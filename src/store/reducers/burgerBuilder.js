import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredientAdded = { ...state.ingredients, [action.ingredient]: state.ingredients[action.ingredient] + 1}
      const updatedIngredientsAdded = updateObject(state.ingredient, updatedIngredientAdded);

      const updatedState = {
        ingredients: updatedIngredientsAdded,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      }

      return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngredientRemoved = { ...state.ingredients, [action.ingredient]: state.ingredients[action.ingredient] - 1};
      const updatedIngredientsRemoved = updateObject(state.ingredients, updatedIngredientRemoved);

      const updatedStateRemoved = {
        ingredients: updatedIngredientsRemoved,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      };
      
      return updateObject(state, updatedStateRemoved);
}

const initIngredients = (state, action) => {
  return updateObject(state, {ingredients: { ...action.ingredients }, error: false, totalPrice: 4 })
}

const initIngredientsFailed = (state, action) => {
  return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return addIngredient(state, action);
    case 'REMOVE_INGREDIENT':
      return removeIngredient(state, action);
    case 'INIT_INGREDIENTS':
      return initIngredients(state, action);
    case 'INIT_INGREDIENTS_FAILED':
      return initIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
