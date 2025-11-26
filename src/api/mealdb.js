const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * A helper function to fetch data from the API and handle basic errors.
 * @param {string} endpoint 
 * @returns {Promise<any>}
 */
const fetchFromApi = async (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch from endpoint: ${endpoint}`, error);
    throw error;
  }
};

/**
 * Searches for recipes by name.
 * @param {string} name 
 * @returns {Promise<any>}
 */
export const searchRecipesByName = (name) => {
  return fetchFromApi(`search.php?s=${name}`);
};

/**
 * Gets the details for a specific recipe by its ID.
 * @param {string} id 
 * @returns {Promise<any>}
 */
export const getRecipeDetailsById = (id) => {
  return fetchFromApi(`lookup.php?i=${id}`);
};

/**
 * Fetches the list of all meal categories.
 * @returns {Promise<any>}
 */
export const listCategories = () => {
  return fetchFromApi('categories.php');
};

/**
 * Filters recipes by a specific category.
 * @param {string} category 
 * @returns {Promise<any>}
 */
export const filterByCategory = (category) => {
  return fetchFromApi(`filter.php?c=${category}`);
};
