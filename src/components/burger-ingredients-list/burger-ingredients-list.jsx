import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-ingredients-list.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';
import { componentType } from '../../utils/types.js';

const BurgerIngredientsList = ({ ingredients }) => {
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
            >
              {component.name}
            </h2>
            <ul className={clsx(styles.ingredients__list)}
            >
              {
                component.items.map(item => (
                  <BurgerIngredientsItem ingredient={item} key={item._id}/>
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
  ingredients: PropTypes.arrayOf(componentType.isRequired),
};

export default BurgerIngredientsList;