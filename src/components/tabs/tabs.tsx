import clsx from 'clsx';
import styles from './tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TabShape } from '../../types/TabShape';

type Props = {
  tabs: TabShape[];
  currentTab: string;
  changeTab: (currentTab: string) => void;
}

const Tabs = ({ tabs, currentTab, changeTab }: Props) => {
  return (
    <ul
      className={clsx(styles.tabs_list)}
    >
      {
        tabs.map((tab) => (
          <li
            key={tab.type}
          >
            <Tab
              value={tab.type}
              active={currentTab === tab.type}
              onClick={(currentTab: string) => changeTab(currentTab)}
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