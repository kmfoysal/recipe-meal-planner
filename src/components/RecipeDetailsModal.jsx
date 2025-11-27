import { CalendarPlus, ClipboardList, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useMealPlan } from '../hooks/useMealPlan';
import { useRecipeDetails } from '../hooks/useRecipeDetails';

const RecipeDetailsModal = ({ recipeId, onClose }) => {
  const recipe = useRecipeDetails(recipeId);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const { addMeal } = useMealPlan();

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus(); // Set focus to the modal when it opens

      const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
          // Basic focus trapping (can be improved with a library)
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              event.preventDefault();
            }
          } else { // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              event.preventDefault();
            }
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleKeyDown);
      return () => {
        if (modalRef.current) { // Add this check
          modalRef.current.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, []); // Empty dependency array means this runs once on mount


  if (!recipe) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="recipe-details-title"
          tabIndex={-1} // Make div focusable
          ref={modalRef}
        >
          <button className="modal-close-button" onClick={onClose} aria-label="Close recipe details modal"><X size={20} /></button>
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
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="recipe-details-title"
        tabIndex={-1} // Make div focusable
        ref={modalRef}
      >
        <button className="modal-close-button" onClick={onClose} aria-label="Close recipe details modal"><X size={20} /></button>
        <h2 id="recipe-details-title" className="modal-title">{recipe.name}</h2>
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
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              aria-label="Select day for meal plan"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <button onClick={handleAddToMealPlan} className="add-to-plan-button" aria-label="Add recipe to meal plan">
              Add to Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;

