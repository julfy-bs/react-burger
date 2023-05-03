import clsx from 'clsx';
import styles from './app.module.css';

import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Loader from '../loader/loader.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { addIngredient } from '../../services/slices/cartSlice.js';

const App = () => {
  const { ingredients } = useSelector(state => state.ingredients);
  const { loading } = useSelector(state => state.loading);
  const { error } = useSelector(state => state.error);
  const { orderNumber } = useSelector(state => state.order);
  const { modalIngredient, isDetailedOrderOpened, isDetailedIngredientOpened } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const handleDrop = (item) => dispatch(addIngredient(item));

  useEffect(() => {
    dispatch(fetchIngredients());
    return () => dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        {
          !loading && ingredients.length > 0
            ?
            <div className={clsx(styles.main_container)}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor onDropHandler={handleDrop}/>
              </DndProvider>
            </div>
            : <Loader loading={loading}/>
        }
        {
          error.exists && <h1>Ошибка</h1>
        }
      </main>

      <Modal
        title={modalIngredient ? 'Детали ингредиента' : ''}
        ariaTitle={isDetailedOrderOpened ? 'Идентификатор заказа' : ''}
      >
        {
          (modalIngredient && isDetailedIngredientOpened) &&
          <IngredientDetails ingredient={modalIngredient}/>
        }
        {
          (orderNumber && isDetailedOrderOpened) &&
          <OrderDetails/>
        }
      </Modal>
    </>
  );
};

export default App;
