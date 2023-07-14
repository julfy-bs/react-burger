import clsx from 'clsx';
import styles from './order.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../../components/loader/loader.jsx';
import OrderDetails from '../../components/order-details/order-details.jsx';
import { fetchGetOrder } from '../../services/asyncThunk/orderThunk';
import NotFound from '../not-found/not-found.jsx';
import { getOrder } from '../../services/helpers/getSelector';

const OrderPage = () => {
  const { order } = useSelector(getOrder);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchGetOrder(params.id));
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