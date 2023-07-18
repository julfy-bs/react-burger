import clsx from 'clsx';
import styles from './burger-ingredients.module.css';

import Tabs from '../tabs/tabs';
import IngredientsContainer from '../ingredients-container/ingredients-container';
import Ingredient from '../ingredient/ingredient';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ingredientTabs } from '../../utils/config';
import { TABS } from '../../utils/constants';
import { getIngredients } from '../../services/helpers/getSelector';
import { TabShape } from '../../types/TabShape';
import { useAppSelector } from '../../hooks/useRedux';

const BurgerIngredients = () => {
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const [currentTab, setCurrentTab] = useState(TABS.BUN);
  const [isScrollable, setIsScrollable] = useState(true);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewMain] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (isScrollable) {
      if (inViewBuns) {
        setCurrentTab(TABS.BUN);
      } else if (inViewSauces) {
        setCurrentTab(TABS.SAUCE);
      } else if (inViewMain) {
        setCurrentTab(TABS.MAIN);
      }
    }
  }, [inViewBuns, inViewMain, inViewSauces, isScrollable]);

  const scrollToId = useCallback((tab: string) => {
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView();
      setCurrentTab(tab);
    }
  }, []);

  const handleTabClick = useCallback((value: string) => {
    setCurrentTab(value);
    setIsScrollable(false);
    scrollToId(value);
    setTimeout(() => setIsScrollable(true), 3000);
  }, [scrollToId]);

  const { ingredients } = useAppSelector(getIngredients);

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
        <li>
          <IngredientsContainer type={TABS.BUN} title={'Булки'} ref={bunsRef}>
            {bunElements}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer type={TABS.SAUCE} title={'Соусы'} ref={saucesRef}>
            {sauceElements}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer type={TABS.MAIN} title={'Начинка'} ref={mainsRef}>
            {mainElements}
          </IngredientsContainer>
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;