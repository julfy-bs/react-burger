import clsx from 'clsx';
import styles from './order-list.module.css';
import { useMemo } from 'react';
import Order from '../order/order';
import { getWebsocket } from '../../services/helpers/getSelector';
import { useAppSelector } from '../../hooks/useRedux';

const OrderList = () => {
  const { orders } = useAppSelector(getWebsocket);

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