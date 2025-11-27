import { createContext, useReducer, useOptimistic, useEffect } from 'react';

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

export const MealPlanContext = createContext();

export const MealPlanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealPlanReducer, getInitialState());
  const [optimisticState, setOptimisticState] = useOptimistic(state);

  // Effect to save meal plan to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('mealPlan', JSON.stringify(state));
    } catch (error) {
      console.error("Error saving meal plan to localStorage:", error);
    }
  }, [state]);

  const addMeal = async (day, recipe) => {
    // Optimistically update the UI
    setOptimisticState({ type: 'ADD_MEAL', payload: { day, recipe } });
    // In a real app, you might await a network request here.
    // For now, we dispatch directly.
    dispatch({ type: 'ADD_MEAL', payload: { day, recipe } });
  };

  const removeMeal = async (day) => {
    // Optimistically update the UI
    setOptimisticState({ type: 'REMOVE_MEAL', payload: { day } });
    // In a real app, you might await a network request here.
    dispatch({ type: 'REMOVE_MEAL', payload: { day } });
  };

  return (
    <MealPlanContext.Provider value={{ mealPlan: optimisticState, addMeal, removeMeal }}>
      {children}
    </MealPlanContext.Provider>
  );
};
