import clsx from 'clsx';
import styles from './app.module.css';

import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Loader from '../loader/loader.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';

import { useModal } from '../../hooks/useModal.js';
import { CartContext } from '../../context/cartContext.js';
import { IngredientsContext } from '../../context/ingredientsContext.js';
import { useCart } from '../../hooks/useCart.js';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, filterIngredients } from '../../services/slices/ingredientsSlice.js';
import { addIngredient } from '../../services/slices/cartSlice.js';
import ingredient from '../../ui/ingredient/ingredient.jsx';

const App = () => {
  // const { cart, dispatch, state } = useCart(ingredients);
  const { detailedIngredient, isDetailedOrderOpened, isModalOpen, closeModal, openModal } = useModal();
  const { ingredients } = useSelector(state => state.ingredients);
  const { loading } = useSelector(state => state.loading);
  const { error } = useSelector(state => state.error);
  const { cart, orderNumber } = useSelector(state => state.cart);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchIngredients());
    return () => {
      dispatch(fetchIngredients());
    }
  }, [])

  return (
    <>
      <Header/>
      <main className={clsx(styles.main, 'pb-10')}>
        {
          !loading && ingredients.length > 0
            ?
            <div className={clsx(styles.main_container)}>
              <BurgerIngredients
                openModal={openModal}
              />
              <BurgerConstructor
                openModal={openModal}
              />
            </div>
            : <Loader loading={loading}/>
        }
        {
          error.exists && <h1>Ошибка</h1>
        }
      </main>
      ;

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title={detailedIngredient ? 'Детали ингредиента' : ''}
        ariaTitle={isDetailedOrderOpened ? 'Идентификатор заказа' : ''}
      >
        {
          detailedIngredient &&
          <IngredientDetails ingredient={detailedIngredient}/>
        }
        {
          (isDetailedOrderOpened && orderNumber) &&
          <OrderDetails orderNumber={cart.orderNumber}/>
        }
      </Modal>;
    </>
  )
    ;
};

export default App;
