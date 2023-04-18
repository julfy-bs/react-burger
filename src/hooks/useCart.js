import { useMemo, useReducer } from 'react';

export const useCart = (ingredients) => {
  const randomizeBun = () => {
    const buns = ingredients.find((item) => item.type === 'bun');
    return buns.items[Math.floor(Math.random() * buns.items.length)];
  };

  const randomizeIngredients = () => {
    const cartIngredients = [];
    ingredients.forEach((item) => {
      if ((item.type === 'main' || item.type === 'sauce')
        && item.items.length > 0) {
        item.items.forEach(ingredient => cartIngredients.push(ingredient));
      }
    });
    return cartIngredients[Math.floor(Math.random() * cartIngredients.length)];
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'summation':
        return { cartPrice: state.cartPrice + action.value };
      case 'subtraction':
        return { cartPrice: state.cartPrice - action.value };
      case 'reset':
        return { cartPrice: 0 };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const initialState = { cartPrice: 0 };

  const stateInitializer = initialState => initialState;

  const [state, dispatch] = useReducer(reducer, initialState, stateInitializer);

  const cart = useMemo(() => {
    return {
      orderNumber: Date.now().toString().split('').slice(7, 13).join(''),
      bun: randomizeBun(),
      ingredients: [randomizeIngredients(), randomizeIngredients()]
    };
  }, [ingredients])
  return { cart, dispatch, state };
};