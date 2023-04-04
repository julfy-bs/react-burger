import clsx from 'clsx';
import styles from './app.module.css';

import { useIngredients } from '../../hooks/useIngredients.js';
import { useCart } from '../../hooks/useCart.js';

import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Loader from '../loader/loader.jsx';

const App = () => {
  const { ingredients, serverData, error, loading } = useIngredients();
  const { cart } = useCart();
  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        {
          !loading && serverData.length > 0
            ?
            <div className={clsx(styles.main_container)}>
              <BurgerIngredients ingredients={ingredients}/>
              <BurgerConstructor cart={cart}/>
            </div>
            : <Loader loading={loading}/>
        }
        {
          error && <h1>Ошибка</h1>
        }
      </main>
    </>
  );
};

export default App;
