import clsx from 'clsx';
import styles from './ingredient-details.module.css';
import { Ingredient } from '../../types/Ingredient';

type Props = {
  ingredient: Ingredient;
}
const IngredientDetails = ({ ingredient }: Props) => {
  return (
    <div className={clsx(styles.ingredientDetail)}>
      <picture className={clsx(styles.ingredientDetail__picture)}>
        <source
          srcSet={ingredient.image_mobile}
          media="(max-width: 480px)"
        />
        <source
          srcSet={ingredient.image_large}
          media="(min-width: 1400px)"
        />
        <img
          className={clsx(styles.ingredientDetail__image)}
          alt={ingredient.name}
          src={ingredient.image}
        />
      </picture>
      <div
        className={clsx(
          styles.ingredientDetail__content,
          'mt-4'
        )}
      >
        <h4
          className={clsx(
            styles.ingredientDetail__title,
            'text',
            'text_type_main-medium'
          )}
        >
          {ingredient.name}
        </h4>
        <div
          className={clsx(
            styles.ingredientDetail__nutritionFacts,
            'mt-8',
            'text',
            'text_type_main-default',
            'text_color_inactive'
          )}
        >
          <span>Калории,ккал</span>
          <span>Белки, г</span>
          <span>Жиры, г</span>
          <span>Углеводы, г</span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.calories}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.proteins}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.fat}
            </span>
          <span
            className={clsx('text_type_digits-default')}
          >
              {ingredient.carbohydrates}
            </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;