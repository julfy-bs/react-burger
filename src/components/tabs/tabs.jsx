import clsx from 'clsx';
import styles from './tabs.module.css';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const Tabs = ({ tabs, currentTab, changeTab }) => {
  return (
    <ul
      className={clsx(styles.tabs_list)}
    >
      {
        tabs.map((tab, index) => (
          <li
            key={tab.type}
          >
            <Tab
              value={tab.type}
              active={currentTab === tab.type}
              onClick={(currentTab) => changeTab(currentTab, index)}
            >
              {tab.name}
            </Tab>
          </li>
        ))
      }
    </ul>
  );
};


Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired,
    type: PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  })),
  currentTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired
};

export default Tabs;