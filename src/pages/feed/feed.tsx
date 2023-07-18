import clsx from 'clsx';
import styles from './feed.module.css';
import { useEffect } from 'react';
import { WSS_FOR_ALL_ORDERS } from '../../utils/config';
import Loader from '../../components/loader/loader';
import OrderList from '../../components/order-list/order-list';
import OrderData from '../../components/order-data/order-data';
import { wsConnectionClosed, wsConnectionStart } from '../../services/slices/wsSlice';
import { getWebsocket } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const FeedPage = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(getWebsocket);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_ALL_ORDERS}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);


  return (
    orders
      ? (
        <div className={clsx(styles.container)}>
          <h2 className={clsx('text', 'text_type_main-large')}>
            Лента заказов
          </h2>
          <section className={styles.feed}>
            <OrderList/>
            <OrderData/>
          </section>
        </div>
      )
      : (<Loader/>)
  );
};


export default FeedPage;