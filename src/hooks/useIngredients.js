import { useEffect, useState } from 'react';
import { api } from '../api/api.js';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState([
    {
      name: 'Булки',
      type: 'bun',
      items: []
    },
    {
      name: 'Соусы',
      type: 'sauce',
      items: []
    },
    {
      name: 'Начинки',
      type: 'main',
      items: []
    }
  ]);
  const [serverData, setServerData] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const configureIngredientsArray = (data) => {
    const updatedComponents = [...ingredients];
    data.forEach(ingredient => {
      updatedComponents.forEach((component) =>
        (component.type === ingredient.type && !component.items.find(item => item._id === ingredient._id))
          ? component.items.push(ingredient)
          : null);
    });
    setIngredients(updatedComponents);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await api.getIngredients();
        configureIngredientsArray(data);
        setServerData(data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    void loadData();
  }, []);

  return { ingredients, serverData, error, loading };
};