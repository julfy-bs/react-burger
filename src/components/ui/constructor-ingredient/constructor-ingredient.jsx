import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import styles from './constructor-ingredient.module.css';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { removeIngredient } from '../../../services/slices/cartSlice.js';
import { memo } from 'react';

const IngredientElement = ({ ingredient, index, findIngredient, moveIngredient }) => {
  const dispatch = useDispatch();
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
        if (id !== ingredient._id) {
          const { index } = findIngredient(ingredient._id);
          moveIngredient(id, index);
        }
      },
    }),
    [moveIngredient, findIngredient],
  );

  const handleDeleteIngredient = () => dispatch(removeIngredient({ index: index }));

  return (
    <li
      className={clsx(styles.item, styles.item_draggable, isDragging && styles.item_dragging)}
      ref={(node) => drag(drop(node))}
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

export default memo(IngredientElement);