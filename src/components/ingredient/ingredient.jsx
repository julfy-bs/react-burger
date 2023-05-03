import clsx from 'clsx';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setModalIngredient } from '../../services/slices/modalSlice.js';
import { useDrag } from 'react-dnd';
import { memo, useMemo } from 'react';

const Ingredient = ({ ingredient }) => {
  const { orderIdsArray } = useSelector(state => state.order);
  const { cart } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const isDisabled = useMemo(() => cart.bun === null, [cart])

  const handleIngredientClick = () => dispatch(setModalIngredient(ingredient)) && dispatch(openModal({ type: 'ingredient' }));

  const ingredientCounter = useMemo(() => (
    orderIdsArray.reduce((acc, current) => {
      ingredient._id === current && (acc += 1);
      return acc;
    }, 0)
  ), [ingredient._id, orderIdsArray]);

  return (
    <>
      <li
        ref={dragRef}
        className={clsx(styles.ingredients__item, (ingredient.type !== 'bun' && isDisabled) && styles.ingredients__item_disabled)}
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