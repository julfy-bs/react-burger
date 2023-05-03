import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs.jsx';
import IngredientsContainer from '../ingredients-container/ingredients-container.jsx';
import Ingredient from '../ingredient/ingredient.jsx';
import { ingredientTabs } from '../../utils/config.js';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';

const BurgerIngredients = () => {
  const tabsRef = useRef(null);
  const [tabs] = useState(ingredientTabs);
  const [currentTab, setCurrentTab] = useState('bun');

  const getRefs = () => (!tabsRef.current) ? tabsRef.current = new Map() : tabsRef.current;

  const scrollToId = useCallback((itemKey) => {
    const refs = getRefs();
    const node = refs.get(itemKey);
    node.scrollIntoView();
  }, []);

  const handleTabClick = useCallback((value, index) => {
    setCurrentTab(value);
    scrollToId(index);
  }, [scrollToId]);


  const { ingredients } = useSelector(store => store.ingredients);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunElements = useMemo(() => buns.map((item) => <Ingredient key={item._id} ingredient={item}/>), [buns]);
  const sauceElements = useMemo(() => sauces.map((item) => <Ingredient key={item._id} ingredient={item}/>), [sauces]);
  const mainElements = useMemo(() => main.map((item) => <Ingredient key={item._id} ingredient={item}/>), [main]);

  return (
    <section className={clsx(styles.section, 'mt-10')}>
      <h1
        className={clsx('text', 'text_type_main-large')}
      >
        Соберите бургер
      </h1>
      <Tabs
        tabs={tabs}
        currentTab={currentTab}
        changeTab={handleTabClick}
      />
      <ul
        className={clsx(styles.ingredients)}
      >
        {
          tabs.map((tab, index) => (
            <InView
              as="li"
              key={index}
              className={clsx(styles.ingredients__column)}
              data-type={tab.type}
              onChange={(inView, entry) => {
                const refs = getRefs();
                refs.set(index, entry.target);
                if (inView) {
                  setCurrentTab(entry.target.dataset.type);
                }
              }}
              threshold={0.5}
              rootMargin='96px 0px 0px 0px'
            >
              <IngredientsContainer type={tab.type} title={tab.name}>
                {
                  tab.type === 'bun'
                    ? bunElements
                    : tab.type === 'sauce'
                      ? sauceElements
                      : mainElements
                }
              </IngredientsContainer>
            </InView>
          ))
        }
      </ul>
    </section>
  );
};

export default BurgerIngredients;