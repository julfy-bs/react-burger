import clsx from 'clsx';
import styles from './burger-ingredients.module.css';

import Tabs from '../tabs/tabs';
import IngredientsContainer from '../ingredients-container/ingredients-container';
import Ingredient from '../ingredient/ingredient';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { InView } from 'react-intersection-observer';

import { ingredientTabs } from '../../utils/config';
import { TABS } from '../../utils/constants';
import { getIngredients } from '../../services/helpers/getSelector';
import { TabShape } from '../../types/TabShape';

const BurgerIngredients = () => {
  const tabsRef = useRef<Map<string, number> | null>(null);
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const [currentTab, setCurrentTab] = useState(TABS.BUN);

  const getRefs = () => (!tabsRef.current) ? tabsRef.current = new Map() : tabsRef.current;

  const scrollToId = useCallback((itemKey: number) => {
    const refs = getRefs();
    const node = refs.get(itemKey);
    node.scrollIntoView();
  }, []);

  const handleTabClick = useCallback((value: string, index: number) => {
    setCurrentTab(value);
    scrollToId(index);
  }, [scrollToId]);


  const { ingredients } = useSelector(getIngredients);

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunElements = useMemo(() => buns.map((item) => <Ingredient key={item._id} ingredient={item}/>), [buns]);
  const sauceElements = useMemo(() => sauces.map((item) => <Ingredient key={item._id} ingredient={item}/>), [sauces]);
  const mainElements = useMemo(() => main.map((item) => <Ingredient key={item._id} ingredient={item}/>), [main]);

  const elementView = useMemo(() => tabs.map((tab, index) => (
    <InView
      as="li"
      key={index}
      className={clsx(styles.ingredients__column)}
      data-type={tab.type}
      onChange={(inView: boolean, entry: IntersectionObserverEntry) => {
        const refs = getRefs();
        refs.set(index, entry.target);
        const target = entry.target as HTMLElement;
        const datasetType = target.dataset.type;
        if (inView && datasetType) {
          setCurrentTab(datasetType);
        }
      }}
      threshold={0.5}
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
  )), [bunElements, mainElements, sauceElements, tabs]);

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
        {elementView}
      </ul>
    </section>
  );
};

export default BurgerIngredients;