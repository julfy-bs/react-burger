import clsx from 'clsx';
import styles from './constructor.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ConstructorPage = () => {

  return (
    <div className={clsx(styles.container)}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default ConstructorPage;
