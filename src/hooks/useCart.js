import { useState } from 'react';
import { cartData } from '../utils/cart.js';

export const useCart = () => {
  const [cart] = useState(cartData);

  return { cart };
};