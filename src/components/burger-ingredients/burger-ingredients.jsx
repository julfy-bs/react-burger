import { useState } from 'react';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { componentType } from '../../utils/types.js';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs.jsx';
import { ingredientTabs } from '../../utils/config.js';
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list.jsx';

const BurgerIngredients = ({ ingredients, openModal }) => {
  const [currentTab, setCurrentTab] = useState('one');
  const [tabs] = useState(ingredientTabs);

  const changeActiveTab = (string) => setCurrentTab(string);

  return (
    <section className={clsx(styles.section, 'mt-10')}>
      <h1
        className={clsx('text', 'text_type_main-large')}
      >
        Соберите бургер
      </h1>
      <BurgerIngredientsTabs
        tabs={tabs}
        currentTab={currentTab}
        changeTab={changeActiveTab}
      />
      <BurgerIngredientsList
        openModal={openModal}
        ingredients={ingredients}
      />
    </section>
  );
};


BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(componentType.isRequired),
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;