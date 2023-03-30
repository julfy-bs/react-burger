import { useState } from 'react';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';
import { componentType } from '../../utils/types.js';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs.jsx';
import { ingredientTabs } from '../../utils/config.js';

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = useState('one');
  const [tabs] = useState(ingredientTabs);
  const changeActiveTab = (string) => setCurrentTab(string);

  return (
    <section>
      <h1
        className={clsx('text', 'text_type_main-large', 'mt-10')}
      >
        Соберите бургер
      </h1>
      <BurgerIngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        changeTab={changeActiveTab}
      />
      <ul
        className={clsx(styles.ingredients)}
      >
        {
          props.data.map((component, index) => (
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
    </section>
  );
};


BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(componentType),
};

BurgerIngredients.defaultProps = {
  data: [],
};

export default BurgerIngredients;