import React, { forwardRef, ReactNode, Ref } from 'react';
import styles from './ingredients-container.module.css';
import clsx from 'clsx';

type Props = {
  title: string;
  type: string;
  children: ReactNode;
}

const IngredientsContainer = forwardRef(({ title, type, children }: Props, ref: Ref<HTMLUListElement>) => {
  return (
    <>
      <h2
        className={clsx('text', 'text_type_main-medium')}
        id={type}
      >
        {title}
      </h2>
      <ul className={clsx(styles.ingredients__list)} ref={ref}>
        {children}
      </ul>
    </>
  );
});

export default IngredientsContainer;