export const SERVER_CONFIG = {
  BASE_URL: `https://norma.nomoreparties.space/api/`,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

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
  FEED: '/feed',
  INGREDIENT: '/ingredients/:id'
};