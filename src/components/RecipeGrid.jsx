import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ searchQuery, category, onRecipeClick }) => { // Added onRecipeClick prop
  const recipes = useRecipes({ searchQuery, category });

  if (!recipes || recipes.length === 0) {
    return <p className="no-recipes-found">No recipes found. Try a different search or category!</p>;
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={onRecipeClick} /> // Pass onRecipeClick to RecipeCard
      ))}
    </div>
  );
};

export default RecipeGrid;
