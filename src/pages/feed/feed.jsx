import clsx from 'clsx';
import styles from './feed.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { WSS_FOR_ALL_ORDERS } from '../../utils/config.js';
import Loader from '../../components/loader/loader.jsx';
import OrderList from '../../components/order-list/order-list.jsx';
import OrderData from '../../components/order-data/order-data.jsx';
import { wsConnectionClosed, wsConnectionStart } from '../../services/slices/wsSlice.js';
import { getWebsocket } from '../../services/helpers/getSelector.js';

const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getWebsocket);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_ALL_ORDERS}`));
    return () => dispatch(wsConnectionClosed());
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