import clsx from 'clsx';
import styles from './not-found.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { PATH } from '../../utils/config';

const NotFoundPage = () => {

  return (
    <section className={clsx(styles.container)}>
      <article className={clsx(styles.article)}>
        <p className="text text_type_digits-large">
          404
        </p>
        <p className="text text_type_main-default">
          К сожалению, эту страницу засосало в черную дыру!
        </p>
      </article>
      <Link to={PATH.HOME}>
        <Button htmlType="button" type="primary" size="medium">
          Вернуться на главную страницу
        </Button>
      </Link>
    </section>
  );
};

export default NotFoundPage;