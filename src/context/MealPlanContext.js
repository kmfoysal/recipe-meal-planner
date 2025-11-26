import { createContext, useReducer, useOptimistic } from 'react';

const initialState = {
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
  Sunday: null,
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
  const [state, dispatch] = useReducer(mealPlanReducer, initialState);
  const [optimisticState, setOptimisticState] = useOptimistic(state);

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
