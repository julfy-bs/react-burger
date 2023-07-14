import { useEffect } from 'react';
import { WSS_FOR_PROFILE_ORDERS } from '../../../utils/config';
import OrderList from '../../../components/order-list/order-list';
import Loader from '../../../components/loader/loader';
import { wsConnectionClosed, wsConnectionStart } from '../../../services/slices/wsSlice';
import { getUser, getWebsocket } from '../../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';

const ProfileOrders = () => {
  const { orders } = useAppSelector(getWebsocket);
  const { user } = useAppSelector(getUser);
  const tokenWithoutBearer = user.token.accessToken?.replace('Bearer ', '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(`${WSS_FOR_PROFILE_ORDERS}?token=${tokenWithoutBearer}`));
    return () => {
      dispatch(wsConnectionClosed())
    };
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