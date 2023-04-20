import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-ingredients-list.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';
import { useContext } from 'react';
import { IngredientsContext } from '../../context/ingredientsContext.js';

const BurgerIngredientsList = ({ openModal }) => {
  const { ingredients } = useContext(IngredientsContext);

  return (
    <ul
      className={clsx(styles.ingredients)}
    >
      {
        ingredients.map((component, index) => (
          <li
            className={clsx(styles.ingredients__column)}
            key={index}
          >
            <h2
              className={clsx('text', 'text_type_main-medium')}
              id={component.type}
            >
              {component.name}
            </h2>
            <ul className={clsx(styles.ingredients__list)}
            >
              {
                component.items.map(item => (
                  <BurgerIngredientsItem
                    openModal={openModal}
                    ingredient={item}
                    key={item._id}
                  />
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  );
};


BurgerIngredientsList.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredientsList;