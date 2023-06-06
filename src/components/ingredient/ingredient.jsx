import clsx from 'clsx';
import styles from './ingredient.module.css';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { setModalIngredient } from '../../services/slices/modalSlice.js';
import { useDrag } from 'react-dnd';
import { memo, useCallback, useMemo } from 'react';

import { ingredientType } from '../../utils/types.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Ingredient = ({ ingredient }) => {
  const { cart, ingredientsCounter } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const isDisabled = useMemo(() => cart.bun === null, [cart]);

  const handleIngredientClick = useCallback(() => {
    dispatch(setModalIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, { state: {background: location}})
    // location.pathname === PATH.HOME && dispatch(openModal({ type: 'ingredient' }));
  }, [dispatch, ingredient, location, navigate]);

  const ingredientCounter = useMemo(() => ingredientsCounter[ingredient._id] || 0, [ingredient._id, ingredientsCounter]);

  return (
    <>
      <li
        ref={dragRef}
        className={
          clsx(
            styles.ingredients__item,
            { [styles.ingredients__item_disabled]: ingredient.type !== 'bun' && isDisabled }
          )
        }
        onClick={handleIngredientClick}

      >
        {!!ingredientCounter && <Counter
          count={+ingredientCounter}
          size="default"
          extraClass="m-1"
        />}
        <picture>
          <source
            srcSet={ingredient.image_mobile}
            media="(max-width: 480px)"
          />
          <source
            srcSet={ingredient.image_large}
            media="(min-width: 1400px)"
          />
          <img
            className={clsx(styles.ingredients__image)}
            alt={ingredient.name}
            src={ingredient.image}
          />
        </picture>
        <div
          className={clsx(styles.ingredients__price)}
        >
            <span
              className={clsx('text', 'text_type_digits-default')}
            >
              {ingredient.price}
            </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <h3
          className={clsx(styles.ingredients__name, 'text', 'text_type_main-default')}
        >
          {ingredient.name}
        </h3>
      </li>
    </>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired
};

export default memo(Ingredient);