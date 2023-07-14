import clsx from 'clsx';
import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TabShape } from '../../types/TabShape';

type Props = {
  tabs: TabShape[];
  currentTab: string;
  changeTab: (currentTab: string, index: number) => void;
}

const Tabs = ({ tabs, currentTab, changeTab }: Props) => {
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

export default Tabs;