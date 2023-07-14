import clsx from 'clsx';
import styles from './ingredient.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details.jsx';
import Loader from '../../components/loader/loader.jsx';
import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredients, getLoading } from '../../services/helpers/getSelector';

const IngredientPage = () => {
  const params = useParams();
  const { loading } = useSelector(getLoading);
  const { ingredients } = useSelector(getIngredients);
  const ingredient = useMemo(() => ingredients.find((item) => item._id === params.id), [params.id, ingredients]);

  return (
    ingredient
      ? (
        <section className={clsx(styles.ingredient_page)}>
          <h2 className={clsx('text', 'text_type_main-large')}>Детали ингредиента</h2>
          <IngredientDetails ingredient={ingredient}/>
        </section>
      )
      : (
        <Loader loading={loading}/>
      )
  );
};

export default memo(IngredientPage);