import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MealPlanProvider } from './context/MealPlanContext.jsx';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import RecipeSearch from './components/RecipeSearch';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetailsModal from './components/RecipeDetailsModal';
import MealCalendar from './components/MealCalendar';
import RecipeGridSkeleton from './components/RecipeGridSkeleton'; // Import the skeleton component

// --- Main App Component ---

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
  };

  return (
    <MealPlanProvider>
      <div className="App">
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <MealCalendar />
          
          <h1>Recipe Finder</h1>
          
          <Suspense fallback={<div style={{ height: '100px' }} /> /* Placeholder for search bar height */}>
            <RecipeSearch setSearchQuery={setSearchQuery} setCategory={setCategory} />
          </Suspense>

          <Suspense fallback={<RecipeGridSkeleton />}>
            <RecipeGrid
              searchQuery={searchQuery}
              category={category}
              onRecipeClick={setSelectedRecipeId}
            />
          </Suspense>

          {selectedRecipeId && (
            <Suspense fallback={<LoadingSpinner />}>
              <RecipeDetailsModal
                recipeId={selectedRecipeId}
                onClose={handleCloseModal}
              />
            </Suspense>
          )}
        </ErrorBoundary>
      </div>
    </MealPlanProvider>
  );
}

export default App;
