import React from 'react';
import { useRecipeDetails } from '../hooks/useRecipeDetails';
import { useMealPlan } from '../hooks/useMealPlan';

const RecipeDetailsModal = ({ recipeId, onClose }) => {
  // The useRecipeDetails hook will suspend this component if the data is not ready.
  // The Suspense fallback will be shown instead.
  // If the promise rejects, it will throw an error that the ErrorBoundary will catch.
  const recipe = useRecipeDetails(recipeId);

  // State for adding to meal plan
  const [selectedDay, setSelectedDay] = React.useState('Monday');
  const { addMeal } = useMealPlan();

  if (!recipe) {
    // This can happen if the API returns no meal for the given ID.
    // The suspense will have already resolved.
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                <p>Could not find recipe details.</p>
            </div>
        </div>
    );
  }

  const handleAddToMealPlan = () => {
    if (selectedDay && recipe) {
      addMeal(selectedDay, recipe);
      alert(`${recipe.name} added to ${selectedDay}!`);
      onClose(); // Close modal after adding
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{recipe.name}</h2>
        <img src={recipe.thumbnail} alt={recipe.name} className="modal-image" />
        <p className="modal-category-area">{recipe.category} | {recipe.area}</p>

        <div className="modal-section">
          <h3>Ingredients</h3>
          <ul className="modal-ingredients-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item.measure} {item.name}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Instructions</h3>
          <p className="modal-instructions">{recipe.instructions}</p>
        </div>

        <div className="modal-add-to-plan">
          <h3>Add to Meal Plan</h3>
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <button onClick={handleAddToMealPlan} className="add-to-plan-button">Add to Plan</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
