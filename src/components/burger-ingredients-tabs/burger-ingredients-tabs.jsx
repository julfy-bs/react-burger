import clsx from 'clsx';
import styles from './burger-ingredients-tabs.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredientsTabs = ({ tabs, currentTab, changeTab }) => {
  return (
    <ul
      className={clsx(styles.tabs_list)}
    >
      {
        tabs.map(tab => (
          <li
            key={tab.value}
          >
            <a href={`#${tab.type}`} className={clsx(styles.tabs__link)}>
              <Tab
                value={tab.value}
                active={currentTab === tab.value}
                onClick={changeTab}
              >
                {tab.name}
              </Tab>
            </a>
          </li>
        ))
      }
    </ul>
  );
};


BurgerIngredientsTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired,
    value: PropTypes.oneOf(['one', 'two', 'three']).isRequired,
    type: PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  })),
  currentTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired
};

export default BurgerIngredientsTabs;