export const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
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