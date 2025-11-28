import { use } from 'react';
import { filterByCategory, searchRecipesByName } from '../utils/mealdb';

/**
 * A custom hook to fetch recipes based on a search query or category.
 * 
 * @param {object} options
 * @param {string} options.searchQuery - The search term for recipes.
 * @param {string} options.category - The category to filter recipes by.
 * @returns {Array<object>} A list of meals.
 */
export const useRecipes = ({ searchQuery, category }) => {
  let promise;

  if (searchQuery) {
    promise = searchRecipesByName(searchQuery);
  } else if (category) {
    promise = filterByCategory(category);
  } else {
    // Default if nothing is selected
    promise = searchRecipesByName('All');
  }

  const { meals } = use(promise);
  return meals || [];
};
