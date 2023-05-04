import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanCart, removeIngredient,
  resetIngredientsCost, sortIngredients,
  summarizeIngredientsCost
} from '../../services/slices/cartSlice.js';
import { openModal } from '../../services/slices/modalSlice.js';
import { resetOrderIdsArray, setOrderIdsArray } from '../../services/slices/orderSlice.js';
import { createOrder } from '../../services/asyncThunk/orderThunk.js';
import { useDrop } from 'react-dnd';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient.jsx';

const BurgerConstructor = ({ onDropHandler }) => {
  const { cart, cartPrice } = useSelector(state => state.cart);
  const { orderIdsArray } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const isButtonDisabled = useMemo(() => cart.bun === null
    || cart.ingredients.length === 0, [cart]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const handleBurgerConstructorButton = async () => {
    if (orderIdsArray.length > 0) {
      await dispatch(createOrder(orderIdsArray));
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

  const findIngredient = useCallback(
    (id) => {
      const ingredient = cart.ingredients.filter(item => item._id === id)[0];
      return {
        ingredient,
        index: cart.ingredients.indexOf(ingredient),
      };
    },
    [cart],
  );

  const moveIngredient = useCallback(
    (id, atIndex) => {
      const { ingredient, index } = findIngredient(id);
      dispatch(removeIngredient({ index }));
      dispatch(sortIngredients({ index, atIndex, ingredient }));
    },
    [dispatch, findIngredient],
  );

  const [{ isHover: isIngredientHover }, refDrop] = useDrop({
    accept: 'ingredientSort',
  });

  const ingredientElements = cart.ingredients.map(
    (ingredient, index) => (
      <ConstructorIngredient
        key={ingredient._id + index}
        index={index}
        ingredient={ingredient}
        moveIngredient={moveIngredient}
        findIngredient={findIngredient}
      />
    )
  );

  return (
    <>
      <section
        className={clsx(styles.section, 'mt-25', isHover && styles.cart__list_hover_active)}
        ref={dropTarget}
      >
        {
          !cart.bun
            ? (
              <h1
                className={
                  clsx('text', 'text_type_main-large', 'pr-4', styles.title)
                }
              >
                Выберите булку
              </h1>
            )
            : (
              <ul
                className={clsx(styles.cart__list)}
              >
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
                  <ul
                    className={clsx(styles.cart__ingredients_list, isIngredientHover && styles.cart__ingredients_list_hovered)}
                    ref={refDrop}
                  >
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
            <span>
              <CurrencyIcon type={'primary'}/>
            </span>
          </div>
          <Button
            extraClass={clsx(styles.button)}
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleBurgerConstructorButton}
            disabled={isButtonDisabled}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;