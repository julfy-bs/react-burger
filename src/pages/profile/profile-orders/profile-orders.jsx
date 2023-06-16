import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WSS_FOR_PROFILE_ORDERS } from '../../../utils/config.js';
import OrderList from '../../../components/order-list/order-list.jsx';
import Loader from '../../../components/loader/loader.jsx';
import { wsConnectionClosed, wsConnectionStart } from '../../../services/slices/wsSlice.js';
import { getUser, getWebsocket } from '../../../services/helpers/getSelector.js';

const ProfileOrders = () => {
  const { orders } = useSelector(getWebsocket);
  const { user } = useSelector(getUser);
  const tokenWithoutBearer = user.token.accessToken?.replace('Bearer ', '');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_PROFILE_ORDERS}?token=${tokenWithoutBearer}`));
    return () => dispatch(wsConnectionClosed());
  }, [dispatch, tokenWithoutBearer]);

  return (
    <>
      {
        orders
          ? (<OrderList/>)
          : (<Loader/>)
      }
    </>
  );
};


export default ProfileOrders;