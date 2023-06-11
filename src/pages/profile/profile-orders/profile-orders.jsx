import clsx from 'clsx';
import styles from './profile-orders.module.css';
import { useEffect, useMemo } from 'react';
import Order from '../../../components/order/order.jsx';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../../../hooks/useWebSocket.js';
import Loader from '../../../components/loader/loader.jsx';
import { WSS_FOR_PROFILE_ORDERS } from '../../../utils/config.js';

const ProfileOrders = () => {
  const { connect, closeWs } = useWebSocket();
  const orders = useSelector(store => store.websocket.wsMessage?.orders);
  const accessToken = useSelector(store => store.user.user.token.accessToken);
  const tokenWithoutBearer = accessToken?.replace('Bearer ', '');

  useEffect(() => {
    if (tokenWithoutBearer) {
      connect(WSS_FOR_PROFILE_ORDERS, tokenWithoutBearer);
    }

    return () => {
      closeWs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenWithoutBearer]);

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
        !!ordersFeed
          ? (<>{ordersFeed.reverse()}</>)
          : (<Loader/>)
      }
    </ul>
  );

};


export default ProfileOrders;