import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanCart,
  removeIngredient,
  resetIngredientsCost,
  summarizeIngredientsCost
} from '../../services/slices/cartSlice.js';
import { openModal } from '../../services/slices/modalSlice.js';
import { resetOrderIdsArray, setOrderIdsArray } from '../../services/slices/orderSlice.js';
import { createOrder } from '../../services/asyncThunk/orderThunk.js';

const BurgerConstructor = () => {
  const { cart, cartPrice } = useSelector(state => state.cart);
  const { orderIdsArray } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const removeIngredientFromCart = (id) => {
    dispatch(removeIngredient(id));
  };

  const handleBurgerConstructorButton = () => {

    if (orderIdsArray.length > 0) {
      dispatch(createOrder(orderIdsArray));
      dispatch(openModal({ type: 'order' }));
      dispatch(cleanCart());
      dispatch(resetIngredientsCost());
      dispatch(resetOrderIdsArray());
    }
  };

  useEffect(() => {
    dispatch(summarizeIngredientsCost());
    cart.bun !== null && dispatch(setOrderIdsArray(cart));
  }, [cart, dispatch]);

  const ingredientElements = cart.ingredients.map(
    (ingredient, index) =>
      <li
        className={clsx(styles.cart__item, styles.cart__item_draggable)}
        key={ingredient._id + index}
      >
        <DragIcon type="primary"/>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => removeIngredientFromCart(index)}
        />
      </li>
  );

  return (
    <>
      <section className={clsx(styles.section, 'mt-25')}>
        {
          !cart.bun
            ? (
              <h1
                className={
                  clsx('text', 'text_type_main-large', styles.title)
                }
              >
                Выберите булку
              </h1>
            )
            : (
              <ul className={clsx(styles.cart__list)}>
                <li
                  className={clsx(styles.cart__item)}
                >
                  <ConstructorElement
                    extraClass={clsx(styles.cart__bun)}
                    type={'top'}
                    isLocked={true}
                    text={`${cart.bun.name} (верх)`}
                    price={cart.bun.price}
                    thumbnail={cart.bun.image}
                  />
                </li>
                <li>
                  <ul className={clsx(styles.cart__ingredients_list)}>
                    {ingredientElements}
                  </ul>
                </li>
                <li
                  className={clsx(styles.cart__item)}
                >
                  <ConstructorElement
                    extraClass={clsx(styles.cart__bun)}
                    type={'bottom'}
                    isLocked={true}
                    text={`${cart.bun.name} (низ)`}
                    price={cart.bun.price}
                    thumbnail={cart.bun.image}
                  />
                </li>
              </ul>
            )
        }
        <div className={clsx(styles.cart__footer)}>
          <div className={clsx(styles.cart__price)}>
            <span className={clsx('text', 'text_type_digits-medium')}>
            {cartPrice}
            </span>
            <span className={styles.cart__currency}>
            <CurrencyIcon type={'primary'}/>
          </span>
          </div>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleBurgerConstructorButton}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;