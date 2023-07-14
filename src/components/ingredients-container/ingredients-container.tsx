import React, { ReactNode } from 'react';
import styles from './ingredients-container.module.css';
import clsx from 'clsx';

type Props = {
  title: string;
  type: string;
  children: ReactNode;
}

const IngredientsContainer = ({ title, type, children }: Props) => {
  return (
    <>
      <h2
        className={clsx('text', 'text_type_main-medium')}
        id={type}
      >
        {title}
      </h2>
      <ul className={clsx(styles.ingredients__list)}>
        {children}
      </ul>
    </>
  );
};

export default IngredientsContainer;