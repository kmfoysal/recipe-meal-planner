import { use } from 'react';
import { getRecipeDetailsById } from '../utils/mealdb';

/**
 * Transforms the raw recipe data from the API into a more structured format.
 * Specifically, it consolidates the 20 ingredient/measure fields into an array of objects.
 * @param {object} rawRecipe - The raw recipe object from TheMealDB API.
 * @returns {object} The formatted recipe object.
 */
const formatRecipe = (rawRecipe) => {
  const ingredients = [];
  // The API returns up to 20 ingredients and measures
  for (let i = 1; i <= 20; i++) {
    const ingredient = rawRecipe[`strIngredient${i}`];
    const measure = rawRecipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ name: ingredient, measure });
    }
  }

  return {
    id: rawRecipe.idMeal,
    name: rawRecipe.strMeal,
    category: rawRecipe.strCategory,
    area: rawRecipe.strArea,
    instructions: rawRecipe.strInstructions,
    thumbnail: rawRecipe.strMealThumb,
    ingredients,
  };
};

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
