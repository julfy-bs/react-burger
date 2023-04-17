import { cartData } from '../utils/cart.js';

export const useCart = () => {
  const cart = cartData;

  return { cart };
};