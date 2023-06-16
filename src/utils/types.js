import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
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

const orderType = PropTypes.shape({
  'createdAt': PropTypes.string.isRequired,
  'ingredients': PropTypes.arrayOf(PropTypes.string).isRequired,
  'name': PropTypes.string.isRequired,
  'number': PropTypes.number.isRequired,
  'status': PropTypes.oneOf(['done', 'pending', 'created']).isRequired,
  'updatedAt': PropTypes.string.isRequired,
  '_id': PropTypes.string.isRequired,
});

export {
  ingredientType,
  orderType
};