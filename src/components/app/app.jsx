import React, { Component } from 'react';
import appStyles from './app.module.css';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import clsx from 'clsx';
import { data } from '../../utils/data.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

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
      componentsIdsMap: [],
      cart: {
        price: 0,
        bun: {
          "_id":"60666c42cc7b410027a1a9b2",
          "name":"Флюоресцентная булка R2-D3",
          "type":"bun",
          "proteins":44,
          "fat":26,
          "carbohydrates":85,
          "calories":643,
          "price":988,
          "image":"https://code.s3.yandex.net/react/code/bun-01.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
          "__v":0
        },
        ingredients: [
          {
            "_id":"60666c42cc7b410027a1a9bf",
            "name":"Сыр с астероидной плесенью",
            "type":"main",
            "proteins":84,
            "fat":48,
            "carbohydrates":420,
            "calories":3377,
            "price":4142,
            "image":"https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9b3",
            "name":"Филе Люминесцентного тетраодонтимформа",
            "type":"main",
            "proteins":44,
            "fat":26,
            "carbohydrates":85,
            "calories":643,
            "price":988,
            "image":"https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9bf",
            "name":"Сыр с астероидной плесенью",
            "type":"main",
            "proteins":84,
            "fat":48,
            "carbohydrates":420,
            "calories":3377,
            "price":4142,
            "image":"https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9b3",
            "name":"Филе Люминесцентного тетраодонтимформа",
            "type":"main",
            "proteins":44,
            "fat":26,
            "carbohydrates":85,
            "calories":643,
            "price":988,
            "image":"https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9bf",
            "name":"Сыр с астероидной плесенью",
            "type":"main",
            "proteins":84,
            "fat":48,
            "carbohydrates":420,
            "calories":3377,
            "price":4142,
            "image":"https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9b3",
            "name":"Филе Люминесцентного тетраодонтимформа",
            "type":"main",
            "proteins":44,
            "fat":26,
            "carbohydrates":85,
            "calories":643,
            "price":988,
            "image":"https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9bf",
            "name":"Сыр с астероидной плесенью",
            "type":"main",
            "proteins":84,
            "fat":48,
            "carbohydrates":420,
            "calories":3377,
            "price":4142,
            "image":"https://code.s3.yandex.net/react/code/cheese.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
            "__v":0
          },
          {
            "_id":"60666c42cc7b410027a1a9b3",
            "name":"Филе Люминесцентного тетраодонтимформа",
            "type":"main",
            "proteins":44,
            "fat":26,
            "carbohydrates":85,
            "calories":643,
            "price":988,
            "image":"https://code.s3.yandex.net/react/code/meat-03.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
            "__v":0
          }
        ]
      }
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
            <BurgerIngredients data={this.state.components} loading={this.state.loading}/>
            <BurgerConstructor cart={this.state.cart} />
          </div>
        </main>
      </>
    );
  };
}

export default App;
