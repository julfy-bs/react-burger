import clsx from 'clsx';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/loader/loader';
import OrderDetails from '../../components/order-details/order-details';
import { fetchGetOrder } from '../../services/asyncThunk/orderThunk';
import NotFound from '../not-found/not-found';
import { getOrder } from '../../services/helpers/getSelector';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const OrderPage = () => {
  const { order } = useAppSelector(getOrder);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    params.id && dispatch(fetchGetOrder(+params.id));
  }, [dispatch, params.id]);

  return (
    order === null
      ? (<Loader />)
      : order
        ? (
          <section className={clsx(styles.section)}>
            <OrderDetails order={order}/>
          </section>
        )
        : (
          <NotFound />
        )
  );
};


export default OrderPage;