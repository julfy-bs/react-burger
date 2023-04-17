import { useMemo } from 'react';

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

  const cart = useMemo(() => {
    return {
      price: 0,
      orderNumber: Date.now().toString(),
      bun: randomizeBun(),
      ingredients: [randomizeIngredients(), randomizeIngredients()]
    };
  }, [ingredients])
  return { cart };
};