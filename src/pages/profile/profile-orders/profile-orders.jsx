import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebSocket } from '../../../hooks/useWebSocket.js';
import { WSS_FOR_PROFILE_ORDERS } from '../../../utils/config.js';
import OrderList from '../../../components/order-list/order-list.jsx';
import Loader from '../../../components/loader/loader.jsx';

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

  return (
    <>
      {
        orders
          ? (<OrderList orders={[...orders].reverse()}/>)
          : (<Loader />)
      }
    </>
  );
};


export default ProfileOrders;