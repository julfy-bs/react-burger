export type Ingredient = {
  _id: string;
  name: string;
  type: 'main' | 'bun' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: string | number;
  _uid?: string;
  quantity?: number;
}