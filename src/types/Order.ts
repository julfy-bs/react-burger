export type Order = {
  createdAt: string;
  ingredients: string;
  name: string;
  number: number;
  status: 'done' | 'pending' | 'created';
  updatedAt: string;
  _id: string;
}