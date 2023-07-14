import { request } from '../helpers/request';
import { IngredientsPromise } from '../../types/IngredientsPromise';

export const getIngredients = (): Promise<IngredientsPromise> => request('ingredients');