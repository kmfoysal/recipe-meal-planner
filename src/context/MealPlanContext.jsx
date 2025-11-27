import { useReducer, useOptimistic, useEffect, useTransition } from 'react';
import { MealPlanContext } from './mealPlanContext.js';

const defaultMealPlan = {
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
  Sunday: null,
};

// Function to get initial state from local storage or return default
const getInitialState = () => {
  try {
    const storedMealPlan = localStorage.getItem('mealPlan');
    if (storedMealPlan) {
      return JSON.parse(storedMealPlan);
    }
  } catch (error) {
    console.error("Error reading meal plan from localStorage:", error);
  }
  return defaultMealPlan;
};

function mealPlanReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEAL':
      return { ...state, [action.payload.day]: action.payload.recipe };
    case 'REMOVE_MEAL':
      return { ...state, [action.payload.day]: null };
    default:
      return state;
  }
}

export const MealPlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealPlanReducer, getInitialState());
  const [optimisticMealPlan, setOptimisticMealPlan] = useOptimistic(state);
  const [, startTransition] = useTransition();

  // Effect to save meal plan to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('mealPlan', JSON.stringify(state));
    } catch (error) {
      console.error("Error saving meal plan to localStorage:", error);
    }
  }, [state]);

  const addMeal = (day, recipe) => {
    startTransition(() => {
      setOptimisticMealPlan({ type: 'ADD_MEAL', payload: { day, recipe } }); 
      dispatch({ type: 'ADD_MEAL', payload: { day, recipe } });
    });
  };

  const removeMeal = (day) => {
    startTransition(() => {
      setOptimisticMealPlan({ type: 'REMOVE_MEAL', payload: { day } }); 
      dispatch({ type: 'REMOVE_MEAL', payload: { day } });
    });
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan: optimisticMealPlan, addMeal, removeMeal }}>
      {children}
    </MealPlanContext.Provider>
  );
};
