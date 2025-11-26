import { useContext } from 'react';
import { MealPlanContext } from '../context/MealPlanContext';

/**
 * A custom hook for accessing the meal plan context.
 * This provides a clean and reusable way to interact with the meal plan state.
 * @returns The meal plan context value.
 */
export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};
