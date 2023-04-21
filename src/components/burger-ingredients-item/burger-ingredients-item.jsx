import clsx from 'clsx';
import styles from './burger-ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from '../../context/cartContext.js';

const BurgerIngredientsItem = ({ ingredient, openModal }) => {
  const { cart } = useContext(CartContext);
  const setIngredientsCondition = () => {
    if(cart.ingredients !== undefined && cart.ingredients.length > 0) {
      return cart.ingredients.some(
        cartIngredient => cartIngredient._id === ingredient._id
      );
    }
    return false
  }

  const setBunCondition = () => {
    if (cart.bun !== undefined && cart.bun !== null) {
      return cart.bun._id === ingredient._id;
    }
    return false;
  }

  const ingredientsCondition = setIngredientsCondition() || false;
  const bunCondition = setBunCondition() || false;

  const countIngredient = (type) => {
    if (type === 'bun') return 1;
    else if (type === 'main' || type === 'sauce') return cart.ingredients.filter(item => item._id === ingredient._id).length;
    else throw new Error('Передайте тип ингредиента!')
  };

  return (
    <>
      <li
        className={clsx(styles.ingredients__item)}
        onClick={() => openModal('ingredient', ingredient)}
      >
        {
          (ingredientsCondition || bunCondition) && (
            <Counter
              count={countIngredient(ingredient.type)}
              size="default"
              extraClass="m-1"
            />
          )
        }
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

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredientsItem;