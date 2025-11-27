import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { MealPlanProvider } from "./context/MealPlanContext.jsx";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import RecipeSearch from "./components/RecipeSearch";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetailsModal from "./components/RecipeDetailsModal";
import MealCalendar from "./components/MealCalendar";
import RecipeGridSkeleton from "./components/RecipeGridSkeleton";
import Layout from "./components/layout/Layout.jsx";
import ShoppingListSidebar from "./components/layout/ShoppingListSidebar.jsx";

// --- Main App Component ---

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <MealPlanProvider>
      <Layout onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
        <div className="App">
          <ErrorBoundary FallbackComponent={ErrorMessage}>
            <MealCalendar />

            <h1>Recipe Finder</h1>

            {/* <Suspense fallback={<div style={{ height: "100px" }} />}> */}
              <RecipeSearch
                setSearchQuery={setSearchQuery}
                setCategory={setCategory}
              />
            {/* </Suspense> */}

            <Suspense fallback={<RecipeGridSkeleton />}>
              <RecipeGrid
                searchQuery={searchQuery}
                category={category}
                onRecipeClick={setSelectedRecipeId}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Layout>

      <ShoppingListSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {selectedRecipeId && (
        <Suspense fallback={<LoadingSpinner />}>
          <RecipeDetailsModal
            recipeId={selectedRecipeId}
            onClose={handleCloseModal}
          />
        </Suspense>
      )}
    </MealPlanProvider>
  );
}

export default App;
