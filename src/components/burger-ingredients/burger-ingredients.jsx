import { useState } from 'react';
import clsx from 'clsx';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';
import { componentType } from '../../utils/types.js';

const BurgerIngredients = (props) => {
  const [currentTab, setCurrentTab] = useState('one');
  const [tabs] = useState([
    {
      name: 'Булки',
      value: 'one',
      clickFunction: () => changeActiveTab('one')
    },
    {
      name: 'Соусы',
      value: 'two',
      clickFunction: () => changeActiveTab('two')
    },
    {
      name: 'Начинки',
      value: 'three',
      clickFunction: () => changeActiveTab('three')
    }
  ]);

  const changeActiveTab = (string) => setCurrentTab(string);

  return (
    <section>
      <h1
        className={clsx('text', 'text_type_main-large', 'mt-10')}
      >
        Соберите бургер
      </h1>
      <ul
        className={clsx(styles.tabs_list)}
      >
        {
          tabs.map(tab => (
            <li
              key={tab.value}
            >
              <Tab
                value={tab.value}
                active={currentTab === tab.value}
                onClick={tab.clickFunction}
              >
                {tab.name}
              </Tab>
            </li>
          ))
        }
      </ul>
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