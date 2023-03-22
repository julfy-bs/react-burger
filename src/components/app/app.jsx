import React, { Component } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import clsx from 'clsx';
import { data } from '../../utils/data.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      componentsIdsMap: []
    };
  }

  addUpdatedComponent = (state, obj, ingredient) => {
    state.componentsIdsMap.push(ingredient._id)
    return { ...obj, items: [...obj.items, ingredient] }
  }

  createBurgerComponentsArray = (data) => {
    data.forEach(ingredient => {
      this.setState(prevState => ({
        components: prevState.components.map(
          (obj) =>
            (!this.state.componentsIdsMap.includes(ingredient._id)
            && obj.type === ingredient.type)
              ? this.addUpdatedComponent(this.state, obj, ingredient)
              : obj
        )
      }));
    });
  };

  componentDidMount() {
    this.createBurgerComponentsArray(data);
  }

  render() {
    return (
      <>
        <Header/>
        <main className={clsx(appStyles.main)}>
          <div className={clsx(appStyles.main_container)}>
            <BurgerIngredients data={this.state.components} loading={this.state.loading}/>
            <h2>rj</h2>
          </div>
        </main>
      </>
    );
  };
}

export default App;
