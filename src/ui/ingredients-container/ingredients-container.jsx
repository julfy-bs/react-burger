import React from 'react';
import styles from './ingredients-container.module.css';
import clsx from 'clsx';

const IngredientsContainer = ({title, type, children}) => {
  return (
    <li>
      <h2
        className={clsx('text', 'text_type_main-medium')}
        id={type}
      >
        {title}
      </h2>
      <ul className={clsx(styles.ingredients__list)}>
        {children}
      </ul>
    </li>
  );
};

IngredientsContainer.propTypes = {

};

export default IngredientsContainer;