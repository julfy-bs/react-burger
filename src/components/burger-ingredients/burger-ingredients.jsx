import { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs.jsx';
import { ingredientTabs } from '../../utils/config.js';
import IngredientsContainer from '../../ui/ingredients-container/ingredients-container.jsx';
import { useSelector } from 'react-redux';
import Ingredient from '../../ui/ingredient/ingredient.jsx';

const BurgerIngredients = ({ openModal }) => {
  const [currentTab, setCurrentTab] = useState('one');
  const [tabs] = useState(ingredientTabs);
  const changeActiveTab = (string) => setCurrentTab(string);

  const { ingredients } = useSelector(store => store.ingredients);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunElements = useMemo(() => buns.map((item) => <Ingredient key={item._id} openModal={openModal} ingredient={item} />), [buns, openModal]);
  const sauceElements = useMemo(() => sauces.map((item) => <Ingredient key={item._id} openModal={openModal} ingredient={item} />), [openModal, sauces]);
  const mainElements = useMemo(() => main.map((item) => <Ingredient key={item._id} openModal={openModal} ingredient={item} />), [main, openModal]);


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
      <ul
        className={clsx(styles.ingredients)}
      >
        <IngredientsContainer type={'buns'} title={'Булки'}>
          { bunElements }
        </IngredientsContainer>
        <IngredientsContainer type={'sauce'} title={'Соусы'}>
          { sauceElements }
        </IngredientsContainer>
        <IngredientsContainer type={'main'} title={'Начинки'}>
          { mainElements }
        </IngredientsContainer>
      </ul>
    </section>
  );
};


BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;