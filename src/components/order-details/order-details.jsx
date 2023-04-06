import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './order-details.module.css';
import IconDone from '../ui/icon-done/icon-done.jsx';

const OrderDetails = ({ orderNumber }) => {
  return (
    <div
      className={clsx(
        styles.cartOrderDetails,
        'mt-4'
      )}
    >
      <span
        className="text text_type_digits-large"
      >
        {orderNumber}
      </span>
      <span
        className={clsx(
          styles.cartOrderDetails__text_case_lower,
          'text',
          'text_type_main-medium',
          'mt-8',
          'mb-15'
        )}
      >
        Идентификатор заказа
      </span>
      <IconDone/>
      <span
        className="text text_type_main-default mt-15 mb-2"
      >
        Ваш заказ начали готовить
      </span>
      <span
        className="text text_type_main-default text_color_inactive"
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};


OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired
};

export default OrderDetails;