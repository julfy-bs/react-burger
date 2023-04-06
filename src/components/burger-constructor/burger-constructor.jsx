import clsx from 'clsx';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { cartType } from '../../utils/types.js';

const BurgerConstructor = ({ cart, isModalOpen, isDetailedOrderOpened, openModal, closeModal }) => {
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
          onClick={() => openModal('cart', true)}
        >
          Оформить заказ
        </Button>
      </div>
      {
        isDetailedOrderOpened &&
        <Modal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          ariaTitle={'Идентификатор заказа'}
        >
          <OrderDetails orderNumber={cart.orderNumber}/>
        </Modal>
      }
    </section>
  );
};

BurgerConstructor.propTypes = {
  cart: cartType.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isDetailedOrderOpened: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default BurgerConstructor;