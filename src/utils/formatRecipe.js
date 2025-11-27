/**
 * Transforms the raw recipe data from the API into a more structured format.
 * Specifically, it consolidates the 20 ingredient/measure fields into an array of objects.
 * @param {object} rawRecipe - The raw recipe object from TheMealDB API.
 * @returns {object} The formatted recipe object.
 */
export const formatRecipe = (rawRecipe) => {
  if (!rawRecipe) {
    return null;
  }
  
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
