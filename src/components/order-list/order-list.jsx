import clsx from 'clsx';
import styles from './order-list.module.css';
import { useMemo } from 'react';
import Order from '../order/order.jsx';
import { useSelector } from 'react-redux';
import { getWebsocket } from '../../services/helpers/getSelector.js';

const OrderList = () => {
  const { orders } = useSelector(getWebsocket);

  const ordersFeed = useMemo(
    () =>
      orders?.map((item) => (
        <li key={item._id}>
          <Order order={item}/>
        </li>
      )),
    [orders]
  );

  return (
    <ul className={clsx(styles.orders, 'page__list')}>
      {
        ordersFeed && ordersFeed.length === 0
          ? (
            <li>
              <h1 className={clsx('text', 'text_type_main-large', styles.subtitle)}>
                Заказы отсутствуют
              </h1>
            </li>
          )
          : <>{ordersFeed}</>
      }
    </ul>
  );
};

export default OrderList;