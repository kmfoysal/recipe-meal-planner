import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe.idMeal)}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image" />
      <h3 className="recipe-card-title">{recipe.strMeal}</h3>
      {recipe.strCategory && <p className="recipe-card-category">{recipe.strCategory}</p>}
    </div>
  );
};

export default RecipeCard;
