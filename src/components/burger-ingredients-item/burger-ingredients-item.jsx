import clsx from 'clsx';
import styles from './burger-ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types.js';
import Modal from '../modal/modal.jsx';
import { useState } from 'react';
import BurgerIngredientsItemDetail from '../burger-ingredients-item-detail/burger-ingredients-item-detail.jsx';

const BurgerIngredientsItem = ({ ingredient }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li
        className={clsx(styles.ingredients__item)}
        onClick={() => {
          setIsOpen(true);
        }}
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
      <Modal isOpen={isOpen} title={'Детали ингредиента'} setIsOpen={setIsOpen}>
        <BurgerIngredientsItemDetail ingredient={ingredient} />
      </Modal>
    </>
  );
}

BurgerIngredientsItem.propTypes = {
  ingredient: ingredientType.isRequired
};

export default BurgerIngredientsItem;