import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './app.module.css';

import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { ingredientsData } from '../../utils/data.js';
import { cartData } from '../../utils/cart.js';

const App = () => {
  const [components, setComponents] = useState([
    {
      name: 'Булки',
      type: 'bun',
      items: []
    },
    {
      name: 'Соусы',
      type: 'sauce',
      items: []
    },
    {
      name: 'Начинки',
      type: 'main',
      items: []
    }
  ]);
  const [cart] = useState(cartData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => createBurgerComponentsArray(ingredientsData), [ingredientsData]);


  const createBurgerComponentsArray = (data) => {
    const updatedComponents = [...components];
    data.forEach(ingredient => {
      updatedComponents.forEach((component, index) =>
        (!updatedComponents[index].items.includes(ingredient)
          && component.type === ingredient.type)
          ? updatedComponents[index].items.push(ingredient)
          : null
      );
    });
    setComponents(updatedComponents);
  };

  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        <div className={clsx(styles.main_container)}>
          <BurgerIngredients data={components}/>
          <BurgerConstructor cart={cart}/>
        </div>
      </main>
    </>
  );
};

export default App;
