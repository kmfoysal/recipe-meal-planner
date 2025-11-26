import React from 'react';
import { useMealPlan } from '../hooks/useMealPlan';

const MealCalendar = () => {
  const { mealPlan, removeMeal } = useMealPlan();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleRemoveMeal = (day) => {
    if (window.confirm(`Are you sure you want to remove ${mealPlan[day].name} from ${day}?`)) {
      removeMeal(day);
    }
  };

  return (
    <div className="meal-calendar-container">
      <h2>Weekly Meal Plan</h2>
      <div className="meal-calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="meal-calendar-day">
            <h3>{day}</h3>
            {mealPlan[day] ? (
              <div className="planned-meal-card">
                <img src={mealPlan[day].thumbnail} alt={mealPlan[day].name} className="planned-meal-image" />
                <p className="planned-meal-title">{mealPlan[day].name}</p>
                <button onClick={() => handleRemoveMeal(day)} className="remove-meal-button">&times;</button>
              </div>
            ) : (
              <div className="no-meal-planned">
                <p>No meal planned</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCalendar;
