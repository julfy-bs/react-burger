export const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
    authorization: '',
    'Content-Type': 'application/json',
  },
};

export const ingredientTabs = [
  {
    name: 'Булки',
    value: 'one',
    type: 'bun'

  },
  {
    name: 'Соусы',
    value: 'two',
    type: 'sauce'
  },
  {
    name: 'Начинки',
    value: 'three',
    type: 'main'
  }
];