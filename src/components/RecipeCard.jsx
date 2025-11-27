import { Tag } from 'lucide-react';

const RecipeCard = ({ recipe, onClick, index }) => {
  return (
    <div
      className="recipe-card"
      onClick={() => onClick(recipe.idMeal)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-card-image" />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        {recipe.strCategory && (
          <div className="recipe-card-category-wrapper">
            <Tag size={14} className="category-icon" />
            <p className="recipe-card-category">{recipe.strCategory}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
