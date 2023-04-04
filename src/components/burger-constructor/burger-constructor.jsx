import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import { useState } from 'react';
import CartOrderDetails from '../cart-order-details/cart-order-details.jsx';

const BurgerConstructor = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={clsx(styles.section, 'mt-25')}>
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
            {
              cart.ingredients.map((ingredient, index) => (
                <li
                  className={clsx(styles.cart__item, styles.cart__item_draggable)}
                  key={ingredient._id + index}
                >
                  <DragIcon type="primary"/>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  />
                </li>
              ))
            }
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
      <div className={clsx(styles.cart__footer)}>
        <div className={clsx(styles.cart__price)}>
            <span className={clsx('text', 'text_type_digits-medium')}>
            {cart.price}
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
          onClick={() => setIsOpen(true)}
        >
          Оформить заказ
        </Button>
        <Modal ariaTitle={'Идентификатор заказа'} isOpen={isOpen} setIsOpen={setIsOpen}>
          <CartOrderDetails orderNumber={cart.orderNumber}/>
        </Modal>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  cart: PropTypes.object,
};

export default BurgerConstructor;