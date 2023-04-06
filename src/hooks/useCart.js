import { useState } from 'react';
import { cartData } from '../utils/cart.js';

export const useCart = () => {
  const [cart, setCart] = useState(cartData);

  return { cart, setCart };
};