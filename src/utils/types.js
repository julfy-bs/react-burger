import PropTypes from 'prop-types';

const ingredientType = PropTypes.exact({
  '_id': PropTypes.string.isRequired,
  'name': PropTypes.string.isRequired,
  'type': PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  'proteins': PropTypes.number.isRequired,
  'fat': PropTypes.number.isRequired,
  'carbohydrates': PropTypes.number.isRequired,
  'calories': PropTypes.number.isRequired,
  'price': PropTypes.number.isRequired,
  'image': PropTypes.string.isRequired,
  'image_mobile': PropTypes.string.isRequired,
  'image_large': PropTypes.string.isRequired,
  '__v': PropTypes.number.isRequired
});

const componentType = PropTypes.exact({
  name: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired,
  type: PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  items: PropTypes.arrayOf(ingredientType).isRequired || []
},)

const cartType = PropTypes.exact({
  price: PropTypes.number.isRequired,
  orderNumber: PropTypes.string.isRequired,
  bun: ingredientType.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired || []
})

export {
  ingredientType,
  componentType,
  cartType
}