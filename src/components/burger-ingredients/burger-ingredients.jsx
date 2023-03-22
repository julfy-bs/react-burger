import React, { Component } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';

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
          className={clsx(burgerIngredientsStyles.tabs_list)}
        >
          {
            this.state.tabs.map((tab, index) => (
              <li key={index}>
                <Tab value={tab.value}
                     active={this.state.current === tab.value}
                     onClick={tab.clickFunction}
                >
                  {tab.name}
                </Tab>
              </li>
            ))
          }
        </ul>
        <ul className={clsx('mt-10', burgerIngredientsStyles.ingredients)}>
          {
            this.props.data.map((component, index) => (
              <li
                className={clsx(burgerIngredientsStyles.ingredients__column)}
                key={index}>
                <h2
                  className={clsx('text', 'text_type_main-medium')}
                >
                  {component.name}
                </h2>
                <ul className={clsx(burgerIngredientsStyles.ingredients__list)}>
                  {component.items.map(item => (
                    <li
                      key={item._id}
                      className={clsx(burgerIngredientsStyles.ingredients__item)}
                    >
                      <Counter count={1} size="default" extraClass="m-1" />
                      <picture>
                        <source
                          srcSet={item.image_mobile}
                          media="(max-width: 480px)"
                        />
                        <source
                          srcSet={item.image_large}
                          media="(min-width: 1400px)"
                        />
                        <img className={clsx(burgerIngredientsStyles.ingredients__image)} alt={item.name}
                             src={item.image}/>
                      </picture>
                      <div
                        className={
                          clsx(burgerIngredientsStyles.ingredients__price)
                        }
                      >
                        <span
                          className={
                            clsx('text',
                              'text_type_digits-default'
                            )
                          }
                        >
                          {item.price}
                        </span>
                        <CurrencyIcon type={'primary'}/>
                      </div>

                      <h3
                        className={
                          clsx(
                            burgerIngredientsStyles.ingredients__name,
                            'text',
                            'text_type_main-default')
                        }
                      >{item.name}</h3>
                    </li>
                  ))}
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