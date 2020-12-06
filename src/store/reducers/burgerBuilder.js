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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      const updatedIngredientAdded = { ...state.ingredients, [action.ingredient]: state.ingredients[action.ingredient] + 1}
      const updatedIngredientsAdded = updateObject(state.ingredient, updatedIngredientAdded);

      const updatedState = {
        ingredients: updatedIngredientsAdded,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      }

      return updateObject(state, updatedState);
    case 'REMOVE_INGREDIENT':
      const updatedIngredientRemoved = { ...state.ingredients, [action.ingredient]: state.ingredients[action.ingredient] - 1};
      const updatedIngredientsRemoved = updateObject(state.ingredients, updatedIngredientRemoved);

      const updatedStateRemoved = {
        ingredients: updatedIngredientsRemoved,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      };
      
      return updateObject(state, updatedStateRemoved);
    case 'INIT_INGREDIENTS':
      return updateObject(state, {ingredients: { ...action.ingredients }, error: false, totalPrice: 4 })
    case 'INIT_INGREDIENTS_FAILED':
      return updateObject(state, {error: true});
    default:
      return state;
  }
};

export default reducer;
