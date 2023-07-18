export const SERVER_CONFIG = {
  BASE_URL: `https://norma.nomoreparties.space/api/`,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

//WebSocket
export const WSS_FOR_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
export const WSS_FOR_PROFILE_ORDERS = 'wss://norma.nomoreparties.space/orders';

export const ingredientTabs = [
  {
    name: 'Булки',
    type: 'bun'
  },
  {
    name: 'Соусы',
    type: 'sauce'
  },
  {
    name: 'Начинки',
    type: 'main'
  }
];

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  ORDER: '/profile/orders/:id',
  FEED: '/feed',
  FEED_ORDER: '/feed/:id',
  INGREDIENT: '/ingredients/:id'
};