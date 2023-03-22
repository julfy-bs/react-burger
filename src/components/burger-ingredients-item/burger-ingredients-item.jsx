import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-ingredients-item.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerIngredientsItem extends Component {
  render() {
    return (
      <li
        key={this.props.ingredient._id}
        className={clsx(styles.ingredients__item)}
      >
        <Counter
          count={1}
          size="default"
          extraClass="m-1"
        />
        <picture>
          <source
            srcSet={this.props.ingredient.image_mobile}
            media="(max-width: 480px)"
          />
          <source
            srcSet={this.props.ingredient.image_large}
            media="(min-width: 1400px)"
          />
          <img
            className={clsx(styles.ingredients__image)}
            alt={this.props.ingredient.name}
            src={this.props.ingredient.image}
          />
        </picture>
        <div
          className={clsx(styles.ingredients__price)}
        >
          <span
            className={clsx('text', 'text_type_digits-default')}
          >
            {this.props.ingredient.price}
          </span>
          <CurrencyIcon type={'primary'}/>
        </div>

        <h3
          className={clsx(styles.ingredients__name, 'text', 'text_type_main-default')}
        >
          {this.props.ingredient.name}
        </h3>
      </li>
    );
  }
}

BurgerIngredientsItem.propTypes = {
  ingredient: PropTypes.exact({
    '_id': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
    'type': PropTypes.oneOf(['main', 'bun', 'sauce']),
    'proteins': PropTypes.number.isRequired,
    'fat': PropTypes.number.isRequired,
    'carbohydrates': PropTypes.number.isRequired,
    'calories': PropTypes.number.isRequired,
    'price': PropTypes.number.isRequired,
    'image': PropTypes.string.isRequired,
    'image_mobile': PropTypes.string.isRequired,
    'image_large': PropTypes.string.isRequired,
    '__v': PropTypes.number.isRequired
  })
};

export default BurgerIngredientsItem;