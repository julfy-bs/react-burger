import { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './app.module.css';

import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import { cartData } from '../../utils/cart.js';
import { getIngredients } from '../../api/getIngredients.js';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

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

  useEffect(() => {
    const loadData = async () => {
      try {
        // loading: true;
        const { data } = await getIngredients();
        configureIngredientsArray(data);
      } catch (e) {
        // user error;
        throw new Error(e);
      } finally {
        //   loading: false;
      }
    };
    void loadData();
  });

  const configureIngredientsArray = (data) => {
    const updatedComponents = [...components];
    data.forEach(ingredient => {
      updatedComponents.forEach((component) =>
        (component.type === ingredient.type && !component.items.find(item => item._id === ingredient._id))
          ? component.items.push(ingredient)
          : null);
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
          <ModalOverlay opened={true} />
        </div>
      </main>
    </>
  );
};

export default App;
