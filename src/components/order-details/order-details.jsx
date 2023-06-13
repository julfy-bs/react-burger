import clsx from 'clsx';
import styles from './order-details.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderType } from '../../utils/types.js';
import { useCallback } from 'react';

const OrderDetails = ({ order }) => {
  const date = new Date(order.createdAt);
  const { ingredients } = useSelector(store => store.ingredients);
  const ingredientsArray = order.ingredients.map((item) => ingredients.find(i => i._id === item));
  const sortArray = useCallback(
    () => ingredientsArray.reduce((acc, item) => {
      if (acc.find(i => i._id === item._id)) {
        return acc.map((value) => value._id === item._id
          ? { ...value, quantity: value.quantity + 1 }
          : value);
      }
      return [...acc, { ...item, quantity: 1 }];
    }, []),
    [ingredientsArray]);
  const checkTotalPrice = useCallback((ingredientsArray) => ingredientsArray.reduce((prev, current) => prev + current.price, 0), []);

  const ingredientList = sortArray.map(
    (item, index) => (
      <li key={index}>
        <div className={clsx(styles.ingredients_item)}>
          <img
            className={`${styles.ingredients_image} `}
            src={item.image}
            alt={`Ингредиент ${item.name}`}
          />

          <h5 className={`text text_type_main-default ${styles.ingredients_title}`}>{item.name}</h5>
          <div className={styles.ingredients_price}>
            <p className={'text text_type_digits-default'}>
              {item.quantity}&#160;x&#160;{item.price}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </li>
    ),
  );

  return (
    <div className={styles.page}>
      <h2 className={clsx(styles.numbers, 'text', 'text_type_digits-default')}>
        #{order.number}
      </h2>
      <div className={clsx(styles.content)}>
        <h3 className={clsx('text', 'text_type_main-medium')}>
          {order.name}
        </h3>
        <p
          className={clsx(
            'text',
            'text_type_main-default',
            'mt-3',
            styles.status,
            { [styles.status_done]: order.status === 'done' }
          )}>
          {order.status === 'done' ? 'Выполнен' : 'Готовится'}
        </p>
        <h4
          className={clsx('mt-15', 'text', 'text_type_main-medium')}
        >
          Состав:
        </h4>
        <ul
          className={clsx(styles.ingredients_list, 'page__list', 'mt-6')}
        >
          {ingredientList}
        </ul>
      </div>

      <div className={clsx(styles.footer)}>
        <FormattedDate
          date={date}
          className={clsx('text', 'text_type_main-default', 'text_color_inactive')}
        />
        <span className={clsx(styles.price)}>
          <span className={clsx('text', 'text_type_digits-default')}>
            {checkTotalPrice(ingredientsArray)}
          </span>
          <CurrencyIcon type="primary"/>
        </span>
      </div>
    </div>
  );
};


OrderDetails.propTypes = {
  order: orderType.isRequired
};

export default OrderDetails;