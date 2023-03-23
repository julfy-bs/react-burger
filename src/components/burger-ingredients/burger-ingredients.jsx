import React, { Component } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item.jsx';

class BurgerIngredients extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 'one',
      tabs: [
        {
          name: 'Булки',
          value: 'one',
          clickFunction: () => this.changeActiveTab('one')
        },
        {
          name: 'Соусы',
          value: 'two',
          clickFunction: () => this.changeActiveTab('two')
        },
        {
          name: 'Начинки',
          value: 'three',
          clickFunction: () => this.changeActiveTab('three')
        }
      ]
    };
  }

  changeActiveTab = (string) => {
    this.setState({ current: string });
  };

  render() {
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
            this.state.tabs.map((tab, index) => (
              <li
                key={index}
              >
                <Tab
                  value={tab.value}
                  active={this.state.current === tab.value}
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
            this.props.data.map((component, index) => (
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
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool
};

BurgerIngredients.defaultProps = {
  data: [],
  loading: true
};

export default BurgerIngredients;