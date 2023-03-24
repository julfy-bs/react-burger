import React, { Component } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import clsx from 'clsx';
import { data } from '../../utils/data.js';
import { cart } from '../../utils/cart.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      components: [
        {
          name: 'Булки',
          type: 'bun',
          items: []
        },
        {
          name: 'Соусы',
          type: 'sauce',
          items: []
        },
        {
          name: 'Начинки',
          type: 'main',
          items: []
        }
      ],
      componentsIdsMap: [],
      cart: cart
    };
  }

  _addUpdatedComponent = (state, obj, ingredient) => {
    state.componentsIdsMap.push(ingredient._id);
    return { ...obj, items: [...obj.items, ingredient] };
  };

  _createBurgerComponentsArray = (data) => {
    data.forEach(ingredient => {
      this.setState(prevState => ({
        components: prevState.components.map(
          (obj) =>
            (!this.state.componentsIdsMap.includes(ingredient._id)
              && obj.type === ingredient.type)
              ? this._addUpdatedComponent(this.state, obj, ingredient)
              : obj
        )
      }));
    });
  };

  componentDidMount() {
    this._createBurgerComponentsArray(data);
  }

  render() {
    return (
      <>
        <Header/>
        <main className={clsx(appStyles.main, 'pb-10')}>
          <div className={clsx(appStyles.main_container)}>
            <BurgerIngredients data={this.state.components}/>
            <BurgerConstructor cart={this.state.cart} />
          </div>
        </main>
      </>
    );
  };
}

export default App;
