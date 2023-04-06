import clsx from 'clsx';
import styles from './burger-ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import PropTypes from 'prop-types';

const BurgerIngredientsItem = ({ ingredient, openModal }) => {
  return (
    <>
      <li
        className={clsx(styles.ingredients__item)}
        onClick={() => openModal('ingredient', ingredient)}
      >
        <Counter
          count={1}
          size="default"
          extraClass="m-1"
        />
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