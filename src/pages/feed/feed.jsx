import clsx from 'clsx';
import styles from './feed.module.css';
import { useWebSocket } from '../../hooks/useWebSocket.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { WSS_FOR_ALL_ORDERS } from '../../utils/config.js';
import Loader from '../../components/loader/loader.jsx';
import OrderList from '../../components/order-list/order-list.jsx';
import OrderData from '../../components/order-data/order-data.jsx';

const FeedPage = () => {
  const { connect, closeWs } = useWebSocket();
  const ordersAll = useSelector(store => store.websocket.wsMessage?.orders);

  useEffect(() => {
    connect(WSS_FOR_ALL_ORDERS);

    return () => {
      closeWs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    ordersAll
      ? (
        <div className={clsx(styles.container)}>
          <h2 className={clsx('text', 'text_type_main-large')}>
            Лента заказов
          </h2>
          <section className={styles.feed}>
            <OrderList orders={ordersAll}/>
            <OrderData/>
          </section>
        </div>
      )
      : (<Loader/>)
  );
};


export default FeedPage;