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
  console.log('BURGER BUILDER REDUCER TRIGGERED!');
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };
    case 'INIT_INGREDIENTS':
      return { ...state, ingredients: { ...action.ingredients }, error: false };
    case 'INIT_INGREDIENTS_FAILED':
      return { ...state, error: true };
    default:
      return state;
  }
};

export default reducer;
