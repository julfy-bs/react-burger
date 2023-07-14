import clsx from 'clsx';
import styles from './ingredient.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Loader from '../../components/loader/loader';
import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/helpers/getSelector';
import { ensureResult } from '../../services/helpers/ensureResult';
import { useAppSelector } from '../../hooks/useRedux';

const IngredientPage = () => {
  const params = useParams();
  const { ingredients } = useAppSelector(getIngredients);
  const ingredient = useMemo(() => ensureResult(ingredients.find((item) => item._id === params.id)), [params.id, ingredients]);

  return (
    ingredient
      ? (
        <section className={clsx(styles.ingredient_page)}>
          <h2 className={clsx('text', 'text_type_main-large')}>Детали ингредиента</h2>
          <IngredientDetails ingredient={ingredient}/>
        </section>
      )
      : (
        <Loader />
      )
  );
};

export default memo(IngredientPage);