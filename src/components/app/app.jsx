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
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setLoading } from '../../services/slices/loadingSlice.js';
import { resetError, setError } from '../../services/slices/errorSlice.js';
import { DndProvider } from 'react-dnd';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk.js';

const App = () => {
  const { ingredients, ingredientsFetchRequest, ingredientsFetchFailed } = useSelector(state => state.ingredients);
  const { loading } = useSelector(state => state.loading);
  const { error } = useSelector(state => state.error);
  const { orderNumber } = useSelector(state => state.order);
  const { modalIngredient, isDetailedOrderOpened, isDetailedIngredientOpened } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    ingredientsFetchFailed
      ? dispatch(setError({
        code: null,
        message: 'Ошибка загрузки ингредиентов'
      }))
      : dispatch(resetError());
  }, [dispatch, ingredientsFetchFailed]);

  useEffect(() => {
    dispatch(fetchIngredients());
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
                <BurgerConstructor />
              </DndProvider>
            </div>
            : <Loader loading={loading}/>
        }
        {
          error.exists && <h1>{error.code !== null && error.code} {error.message}</h1>
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
