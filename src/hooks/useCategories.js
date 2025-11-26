import { use } from 'react';
import { listCategories } from '../api/mealdb';

/**
 * A custom hook to fetch the list of meal categories.
 * @returns {Array<object>} A list of category objects.
 */
export const useCategories = () => {
  const { categories } = use(listCategories());
  return categories || [];
};
