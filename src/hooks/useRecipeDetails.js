import { use } from 'react';
import { getRecipeDetailsById } from '../utils/mealdb';
import { formatRecipe } from '../utils/formatRecipe';

/**
 * A custom hook to fetch the details for a specific recipe by its ID.
 * It returns a formatted recipe object.
 * 
 * @param {string | null} recipeId - The ID of the recipe to fetch.
 * @returns {object | null} The detailed recipe object or null if not found or no ID is provided.
 */
export const useRecipeDetails = (recipeId) => {
  if (!recipeId) {
    return null;
  }

  const promise = getRecipeDetailsById(recipeId);
  const data = use(promise);

  if (!data || !data.meals) {
    return null;
  }

  const formattedRecipe = formatRecipe(data.meals[0]);
  return formattedRecipe;
};
