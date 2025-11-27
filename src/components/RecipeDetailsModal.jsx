import React from 'react';
import { useRecipeDetails } from '../hooks/useRecipeDetails';
import { useMealPlan } from '../hooks/useMealPlan';
import { X, ClipboardList, CalendarPlus } from 'lucide-react';

const RecipeDetailsModal = ({ recipeId, onClose }) => {
  const recipe = useRecipeDetails(recipeId);
  const [selectedDay, setSelectedDay] = React.useState('Monday');
  const { addMeal } = useMealPlan();

  if (!recipe) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}><X size={20} /></button>
          <p>Could not find recipe details.</p>
        </div>
      </div>
    );
  }

  const handleAddToMealPlan = () => {
    if (selectedDay && recipe) {
      addMeal(selectedDay, recipe);
      alert(`${recipe.name} added to ${selectedDay}!`);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title">{recipe.name}</h2>
        <img src={recipe.thumbnail} alt={recipe.name} className="modal-image" />
        <p className="modal-category-area">{recipe.category} | {recipe.area}</p>

        <div className="modal-section">
          <div className="modal-section-header">
            <ClipboardList size={24} />
            <h3>Ingredients</h3>
          </div>
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
          <div className="modal-section-header">
            <CalendarPlus size={24} />
            <h3>Add to Meal Plan</h3>
          </div>
          <div className="add-to-plan-controls">
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button onClick={handleAddToMealPlan} className="add-to-plan-button">Add to Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
