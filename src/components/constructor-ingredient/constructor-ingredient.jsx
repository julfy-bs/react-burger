import clsx from 'clsx';
import styles from './constructor-ingredient.module.css';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { removeIngredient } from '../../services/slices/cartSlice.ts';
import { memo, useRef } from 'react';

import { ingredientType } from '../../utils/types.js';

const IngredientElement = ({ ingredient, index, moveIngredient }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ingredientSort',
      item: { id: ingredient._id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      })
    }),
    [index, moveIngredient],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'ingredientSort',
      hover({ id }) {
        (id !== ingredient._id) && moveIngredient(id, index);
      },
    }),
    [moveIngredient],
  );

  const handleDeleteIngredient = () => dispatch(removeIngredient({ index: index, _id: ingredient._id }));

  drag(drop(ref));

  return (
    <li
      className={clsx(styles.item, styles.item_draggable, isDragging && styles.item_dragging)}
      ref={ref}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDeleteIngredient}
      />
    </li>
  );
};

IngredientElement.propTypes = {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired
};

export default memo(IngredientElement);