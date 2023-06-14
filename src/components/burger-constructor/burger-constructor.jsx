import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, moveIngredients } from '../../services/slices/cartSlice.js';
import { createOrder } from '../../services/asyncThunk/orderThunk.js';
import { useDrop } from 'react-dnd';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient.jsx';
import uuid from 'react-uuid';
import { PATH } from '../../utils/config.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeAllModal } from '../../services/slices/modalSlice.js';
import { useModal } from '../../hooks/useModal.js';
import { getCart, getOrder, getUser } from '../../services/helpers/getSelector.js';

const BurgerConstructor = () => {
  const { cart } = useSelector(getCart);

  const { openNotificationModal } = useModal();
  const { isLogin } = useSelector(getUser);
  const { fetch } = useSelector(getOrder);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isButtonDisabled = useMemo(() => !!(cart.bun === null
    || cart.ingredients.length === 0 || fetch), [cart.bun, cart.ingredients.length, fetch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      if (cart.bun === null && ingredient.type !== 'bun') {
        openNotificationModal('Сначала выберите булку!');
        setTimeout(() => dispatch(closeAllModal()), 2000);
      } else if (ingredient.type !== 'bun') {
        dispatch(addIngredient({
          ...ingredient,
          _uid: uuid()
        }));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const redirectToLoginPage = useCallback(() => {
    navigate(PATH.LOGIN, { replace: true, state: { background: location.pathname } });
  }, [location.pathname, navigate]);

  const handleBurgerConstructorButton = useCallback(
    () => (isLogin)
      ? dispatch(createOrder(cart))
      : redirectToLoginPage(), [cart, dispatch, isLogin, redirectToLoginPage]);


  const cartPrice = useMemo(() => {
    if (cart.bun !== null) {
      const bunPrice = cart.bun.price;
      const ingredientsPrice = cart.ingredients.reduce((acc, current) => acc + current.price, 0);
      return bunPrice + ingredientsPrice + bunPrice;
    } else {
      return 0;
    }
  }, [cart.bun, cart.ingredients]);

  const findIngredient = useCallback(
    (id) => {
      const ingredient = cart.ingredients.find(item => item._id === id);
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
      dispatch(moveIngredients({ index, atIndex, ingredient }));
    },
    [dispatch, findIngredient],
  );

  const [{ isHover: isIngredientHover }, refDrop] = useDrop({
    accept: 'ingredientSort',
  });

  const ingredientElements = cart.ingredients.map(
    (ingredient, index) => (
      <ConstructorIngredient
        key={ingredient._uid}
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
            {
              fetch
                ? 'Оформляем заказ...'
                : 'Оформить заказ'
            }
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;